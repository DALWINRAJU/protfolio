import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { CONTENT_DATA, PLATFORM_CONFIG, getLatestContent } from './contentData';
import { useScene } from '../../../../context/SceneContext';
import { useAchievements } from '../../../../context/AchievementsContext';
import { TextureLoader } from 'three';
import FloatingCodeParticles from './FloatingCodeParticles';
import { PositionalAudio, Text } from '@react-three/drei';
import { useAudio } from '../../../../context/AudioManager';
import { useStudioContent } from '../../../../hooks/useSanityData';
import '../../shaders/RevealMaterial';
import { isTouchDevice } from '../../../../utils/deviceDetect';
import { usePaintMaterial } from '../Gallery/usePaintMaterial';

// ============================================
// ⚙️ PAINT CONFIGURATION - TWEAK HERE (Skąd-Dokąd)
// Edytuj te wartości, aby zmienić kierunek i zakres animacji wejścia
// ============================================
const STUDIO_PAINT_CONFIG = {
    dirX: 0.0,
    dirY: -1.0,    // Kierunek: od góry (-1) do dołu
    dirZ: 0.0,
    startDist: -10.0, // Początek fali
    endDist: 10.0,   // Koniec fali
    noiseAxes: 'xz'  // Płaszczyzna szumu
};

// ============================================
// ⚙️ AUDIO SETTINGS - TWEAK HERE
// Edytuj te wartości, aby zmienić głośność i zasięg słyszalności szumu monitorów
// ============================================
export const AUDIO_SETTINGS = {
    volume: 1,
    distance: 2,
    rolloff: 1.0
};

// ============================================
// CONFIG - Adjust these values as needed
// ============================================
const CAMERA_Y_OFFSET = -6; // Negative = camera lower, Positive = camera higher
const CAMERA_ZOOM_DISTANCE = 3; // Distance from monitor front when zoomed in
const CAMERA_PAN_RIGHT = 1; // How far camera moves right after zoom (for content panel space)
const TOWER_RADIUS = 2.2; // All monitors at same distance from center (smaller = narrower)
const MONITORS_PER_RING = 4; // How many monitors per vertical level
const FALL_SPEED = 0.3; // How fast monitors fall down
const TOWER_HEIGHT = 12; // Total visible height of tower
const VERTICAL_SPACING = 2.5; // Space between monitor rings
const TOWER_Y_START = -5; // Starting Y offset for tower (negative = lower) -> CONTROLS HEIGHT (UP/DOWN)
const TOWER_Z_START = -10; // Starting Z position (negative = further away) -> CONTROLS DISTANCE

const StudioRoom = ({ showRoom, onReady, isExiting, isWarmup }) => {
    const groupRef = useRef();
    const towerRef = useRef();
    const { camera, size } = useThree();

    // Responsive camera parameters based on PIXEL width
    const responsiveParams = useMemo(() => {
        const isMobile = size.width < 768; // Standard mobile breakpoint
        const isTablet = size.width < 1024 && size.width >= 768;


        return {
            zoomDistance: isMobile ? 2 : isTablet ? 3 : CAMERA_ZOOM_DISTANCE,
            panRight: isMobile ? 0 : isTablet ? 0.5 : Math.max(0.3, (size.width / 1920) * CAMERA_PAN_RIGHT),
            panDown: isMobile ? 9.7 : 0, // Positive = camera DOWN = monitor at TOP
            yOffset: isMobile ? 2.5 : isTablet ? -3 : CAMERA_Y_OFFSET,
            towerRadius: isMobile ? 1.5 : (isTablet ? 1.8 : TOWER_RADIUS),
            isMobile, // Pass through boolean
        };
    }, [size.width]);

    // Store original camera position for reset
    const originalCameraY = useRef(null);
    const originalCameraZ = useRef(null);
    const originalCameraX = useRef(null);

    // State
    const isDraggingRef = useRef(false);
    const lastXRef = useRef(0);
    const dragDistance = useRef(0); // Changed to ref to prevent 100x/sec re-renders on drag

    // Physics
    const rotationVelocity = useRef(0);
    const autoRotationSpeed = useRef(0.12); // Now a ref to support changing direction
    const DRAG_SENSITIVITY = 0.008; // Increased from 0.005
    const FRICTION = 0.98; // Increased from 0.95 (longer spin)

    // Vertical Fall Physics
    const fallSpeed = useRef(FALL_SPEED); // Start with default
    const BASE_FALL_SPEED = FALL_SPEED;
    const SCROLL_SENSITIVITY = 0.006; // Tripled from 0.002
    const SWIPE_SENSITIVITY = 0.005; // Adjusted
    const SPEED_DECAY = 0.985; // Slower return to normal (was 0.96)

    // Content State
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Global Scene Context for Overlay
    const { openOverlay, overlayContent, isTeleporting } = useScene();

    // Achievements Context
    const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
    const { globalVolume, isMuted } = useAudio();
    const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

    // Pobieranie danych z Sanity.io (fallback do starych danych)
    const sanityContent = useStudioContent();
    const activeContent = sanityContent || CONTENT_DATA;

    const audioRef = useRef();
    useEffect(() => {
        if (audioRef.current && audioRef.current.setVolume) {
            audioRef.current.setVolume(effectiveVolume);
        }
    }, [effectiveVolume]);

    useEffect(() => {
        if (isExiting || isTeleporting) {
            hidePopup();
        }
    }, [isExiting, isTeleporting, hidePopup]);

    // ===== PAINT TRANSITION (top-to-bottom) =====
    const { onBeforeCompile: paintOnBeforeCompile, animatePaint, resetPaint, uniformsData: paintUniforms, updateRoomOrigin } = usePaintMaterial(STUDIO_PAINT_CONFIG);

    const [isTransitioning, setIsTransitioning] = useState(false);

    const wasTeleportedRef = useRef(false);
    useEffect(() => {
        if (isTeleporting) wasTeleportedRef.current = true;
    }, [isTeleporting]);

    useEffect(() => {
        if (showRoom && !isWarmup) {
            if (wasTeleportedRef.current || isTeleporting) {
                paintUniforms.uPaintProgress.value = 1.0;
                setIsTransitioning(false);
            } else {
                setIsTransitioning(true);
                resetPaint();
                animatePaint(0.2, 2.5);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 2700);
            }
        } else {
            paintUniforms.uPaintProgress.value = 1.0;
        }
    }, [showRoom, isWarmup, isTeleporting]);

    const latestContent = useMemo(() => {
        if (!activeContent || activeContent.length === 0) return null;
        return [...activeContent].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    }, [activeContent]);

    // Monitor Y offsets for falling animation (mutable)
    const monitorOffsets = useRef([]);
    // Refs to monitor meshes for direct position updates (avoids 28 useFrame hooks)
    const monitorRefs = useRef([]);

    // Track tower state for floating particles parallax (REFS not state!)
    const particleTowerRotation = useRef(0);
    const particleFallOffset = useRef(0);

    // Track if we've signaled ready
    const hasSignaledReady = useRef(false);
    const frameCount = useRef(0);
    const FRAMES_TO_WAIT = 5; // Wait for 5 actual render frames

    // Real render-based ready detection - count actual rendered frames
    useFrame(() => {
        // Update room origin for paint shader
        updateRoomOrigin(groupRef);

        if (hasSignaledReady.current) return;

        frameCount.current++;

        // After N frames have been rendered, we know GPU has drawn the content
        if (frameCount.current >= FRAMES_TO_WAIT) {
            hasSignaledReady.current = true;
            onReady?.();
            if (!isWarmup) setTimeout(() => showTutorial('studio_interact'), 2000);
        }
    });

    // Build cylindrical tower - all monitors at same radius, shuffled content, staggered heights
    const monitorData = useMemo(() => {
        const items = [];

        // Shuffle content for mixed appearance (seeded for consistency)
        let shuffledContent = [...activeContent].sort(() => 0.5 - Math.random());
        
        // Ensure the tower is extremely tall (at least 12 rings = 48 items)
        // so that the teleportation boundaries are far outside the camera's view.
        if (shuffledContent.length > 0) {
            while (shuffledContent.length < 48) {
                shuffledContent = [...shuffledContent, ...[...activeContent].sort(() => 0.5 - Math.random())];
            }
        }

        // Calculate how many rings we need
        const totalMonitors = shuffledContent.length;
        const ringsNeeded = Math.ceil(totalMonitors / MONITORS_PER_RING);

        let contentIndex = 0;
        const currentRadius = responsiveParams.towerRadius;

        for (let ring = 0; ring < ringsNeeded && contentIndex < shuffledContent.length; ring++) {
            const angleStep = (Math.PI * 2) / MONITORS_PER_RING;
            const angleOffset = ring % 2 === 0 ? 0 : angleStep / 2; // Offset alternate rings

            for (let i = 0; i < MONITORS_PER_RING && contentIndex < shuffledContent.length; i++) {
                const contentItem = shuffledContent[contentIndex];
                const platform = PLATFORM_CONFIG[contentItem.platform] || {
                    shape: contentItem.device || 'monitor',
                    color: '#ffffff',
                    accentColor: '#cccccc',
                    icon: '🌐',
                    label: contentItem.platform || 'Web',
                };
                const angle = i * angleStep + angleOffset;

                const x = Math.cos(angle) * currentRadius;
                const z = Math.sin(angle) * currentRadius;

                // Staggered Y - base + random jitter for organic look
                const baseY = ring * VERTICAL_SPACING;
                const yJitter = (Math.sin(contentIndex * 1.7) + Math.cos(contentIndex * 2.3)) * 0.4; // Pseudo-random
                const finalY = baseY + yJitter;

                let width, height, depth;
                const deviceShape = contentItem.device || platform.shape || 'monitor';
                switch (deviceShape) {
                    case 'tv':
                        width = 1.6; height = 1.187; depth = 1.0; // Legacy 1.348 ratio
                        break;
                    case 'monitor':
                        width = 1.6; height = 1; depth = 0.15; // Legacy 1.835 ratio
                        break;
                    case 'phone':
                        width = 0.6; height = 1.139; depth = 0.1; // Legacy 0.527 ratio
                        break;
                    default:
                        width = 1.4; height = 1.0; depth = 0.6;
                }

                items.push({
                    ...contentItem,
                    index: contentIndex,
                    x,
                    baseY: finalY, // Staggered Y position
                    z,
                    width, height, depth,
                    angle: angle,
                    rot: -angle + Math.PI / 2,
                    platformConfig: platform,
                    isLatest: latestContent ? contentItem.id === latestContent.id : false,
                });

                contentIndex++;
            }
        }

        // Initialize offsets
        monitorOffsets.current = items.map(() => 0);

        // Pre-compute totalHeight for seamless loop (avoid calculating in useFrame)
        const minBaseY = items.length > 0 ? Math.min(...items.map(m => m.baseY)) : 0;
        const maxBaseY = items.length > 0 ? Math.max(...items.map(m => m.baseY)) : 0;
        // Make sure we have a baseline height so monitors don't instantly teleport if there's only 1 row
        const totalHeight = Math.max(VERTICAL_SPACING * 3, maxBaseY - minBaseY + VERTICAL_SPACING);

        return { items, totalHeight };
    }, [latestContent?.id, responsiveParams.towerRadius, activeContent]);

    // Destructure for easier access
    const monitors = monitorData.items;
    const totalHeight = monitorData.totalHeight;

    // Need a ref for lastY too
    const lastYRef = useRef(0);

    // --- INTERACTION ---
    const handlePointerDown = (e) => {
        if (isAnimating) return;
        // e.preventDefault(); // Might block scroll, good for custom drag
        e.stopPropagation(); // Stop bubbling

        isDraggingRef.current = true;
        lastXRef.current = e.clientX;
        lastYRef.current = e.clientY; // Store init Y
        dragDistance.current = 0;
        rotationVelocity.current = 0;

        // Disable auto-rotate immediately
        document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = useCallback(() => {
        isDraggingRef.current = false;
        document.body.style.cursor = 'auto';
    }, []);

    const handlePointerMove = useCallback((e) => {
        if (!isDraggingRef.current || !towerRef.current || isAnimating) return;

        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
        const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

        if (!clientX || !clientY) return;

        const deltaX = clientX - lastXRef.current;
        const deltaY = clientY - lastYRef.current;

        lastXRef.current = clientX;
        lastYRef.current = clientY;

        dragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

        // HORIZONTAL -> Rotation
        if (Math.abs(deltaX) > 1) {
            autoRotationSpeed.current = Math.sign(deltaX) * 0.12;
        }
        rotationVelocity.current = deltaX * DRAG_SENSITIVITY;
        towerRef.current.rotation.y += rotationVelocity.current;

        // VERTICAL -> Fall Speed
        fallSpeed.current += deltaY * SWIPE_SENSITIVITY;

        unlockAchievement('studio_interact');
    }, [isAnimating, unlockAchievement]);

    // Wheel Listener for Desktop
    useEffect(() => {
        const handleWheel = (e) => {
            // e.deltaY > 0 means scroll DOWN.
            // Scroll DOWN -> Monitors go DOWN (Speed +).
            // Scroll UP -> Monitors go UP (Speed -).
            fallSpeed.current += e.deltaY * SCROLL_SENSITIVITY;
            unlockAchievement('studio_interact');
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [unlockAchievement]);

    // Global Event Listeners for seamless drag
    useEffect(() => {
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointermove', handlePointerMove);
        // Also touch events for mobile if pointer events fail (though React usually patches)
        window.addEventListener('touchend', handlePointerUp);
        window.addEventListener('touchmove', handlePointerMove); // Native touchmove

        return () => {
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
        };
    }, [handlePointerUp, handlePointerMove]);

    // STEP 1 ONLY: Rotate tower to center the clicked monitor
    const handleMonitorClick = useCallback((item) => {
        // Prevent click if we were dragging
        if (dragDistance.current > 5 || isAnimating || !towerRef.current) return;

        setIsAnimating(true);
        setSelectedMonitor(item);
        rotationVelocity.current = 0;

        unlockAchievement('studio_interact');

        // Monitor's facing rotation (item.rot = -angle + PI/2)
        // Monitor's screen faces local +Z, rotated by item.rot
        // Tower rotated by towerRotation
        // World facing = item.rot + towerRotation
        // We want world facing = 0 (toward camera at +Z)
        // So: towerRotation = -item.rot

        const monitorFacingRotation = item.rot;
        let targetRotation = -monitorFacingRotation;

        // Normalize current rotation
        let currentRotation = towerRef.current.rotation.y % (Math.PI * 2);
        if (currentRotation < 0) currentRotation += Math.PI * 2;

        // Normalize target
        while (targetRotation < 0) targetRotation += Math.PI * 2;
        targetRotation = targetRotation % (Math.PI * 2);

        // Find shortest path from current to target
        let delta = targetRotation - currentRotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        // Final target = current + shortest delta
        const finalRotation = towerRef.current.rotation.y + delta;


        // STEP 1: Animate tower rotation
        gsap.to(towerRef.current.rotation, {
            y: finalRotation,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                // STEP 2: After rotation, move camera Y to center on monitor
                // Store original camera Y if not stored
                if (originalCameraY.current === null) {
                    originalCameraY.current = camera.position.y;
                }

                // Monitor's world Y position
                // Group is at y=-1.2, tower at y=0 relative to group
                // Monitor's current Y = baseY + offset
                const monitorCurrentY = item.baseY + (monitorOffsets.current[item.index] || 0);
                const monitorWorldY = -1.2 + monitorCurrentY + responsiveParams.yOffset;

                // STEP 3: Move camera FORWARD (in the direction it's looking)
                // Store original camera position if not stored
                if (originalCameraZ.current === null) {
                    originalCameraZ.current = camera.position.z;
                    originalCameraX.current = camera.position.x;
                }

                // Get camera's forward direction
                const forward = new THREE.Vector3();
                camera.getWorldDirection(forward);

                // Get camera's right direction (cross product of forward and up)
                const up = new THREE.Vector3(0, 1, 0);
                const right = new THREE.Vector3();
                right.crossVectors(forward, up).normalize();

                // STEP 3 & 4: Move camera forward + right/down (using responsive values)
                const zoomDist = responsiveParams.zoomDistance;
                const panRight = responsiveParams.panRight;
                const panDown = responsiveParams.panDown;

                const targetX = camera.position.x + forward.x * zoomDist + right.x * panRight;
                const targetZ = camera.position.z + forward.z * zoomDist + right.z * panRight;
                const targetY = monitorWorldY - panDown; // Pan down moves camera down = monitor at top


                gsap.to(camera.position, {
                    x: targetX,
                    y: targetY,
                    z: targetZ,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        setIsAnimating(false);
                        openOverlay(item); // Open global overlay in HUD
                    }
                });
            }
        });

    }, [isAnimating, camera, responsiveParams, openOverlay]);

    // Trigger camera return ONLY when overlay is explicitly closed
    // We use a ref to track if overlay was previously open to avoid initial race conditions
    const prevOverlayContent = useRef(null);

    useEffect(() => {
        // If it WAS open (prev) and is NOW closed (null) AND we are viewing a monitor -> Return camera
        if (prevOverlayContent.current && !overlayContent && selectedMonitor && !isAnimating) {
            handleReturnCamera();
        }

        // Update ref for next render
        prevOverlayContent.current = overlayContent;
    }, [overlayContent, selectedMonitor, isAnimating]);

    const handleReturnCamera = useCallback(() => {
        setIsAnimating(true);

        // Slightly faster return
        if (originalCameraX.current !== null && originalCameraY.current !== null && originalCameraZ.current !== null) {
            gsap.to(camera.position, {
                x: originalCameraX.current,
                y: originalCameraY.current,
                z: originalCameraZ.current,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    setIsAnimating(false);
                    setSelectedMonitor(null); // Resume auto-rotation
                }
            });
        } else {
            setIsAnimating(false);
            setSelectedMonitor(null);
        }
    }, [camera]);

    // Cleaned up old listener effect that is now handled by the global effect above

    useFrame((state, delta) => {
        if (!towerRef.current) return;

        // Auto-rotate and Physics when idle
        if (!isDraggingRef.current && !isAnimating && !selectedMonitor) {
            towerRef.current.rotation.y += autoRotationSpeed.current * delta + rotationVelocity.current;
            rotationVelocity.current *= FRICTION;

            // Decay fall speed back to base speed (but keep direction!)
            // If going down (>0), drift to positive base. If going up (<0), drift to negative base.
            const targetDrift = fallSpeed.current > 0 ? BASE_FALL_SPEED : -BASE_FALL_SPEED;
            fallSpeed.current = THREE.MathUtils.lerp(fallSpeed.current, targetDrift, 1.0 - SPEED_DECAY);

            // totalHeight is now pre-computed in useMemo for performance
            // Update all monitor offsets and positions in a single loop (no child useFrames needed)
            monitors.forEach((monitor, index) => {
                // Update offset
                monitorOffsets.current[index] -= fallSpeed.current * delta;

                // Calculate current Y
                const currentY = monitor.baseY + monitorOffsets.current[index];

                // If below threshold (-10.0), teleport to top (seamless loop)
                // If moving UP (negative speed), check TOP threshold (totalHeight - 10.0)
                if (currentY < -10.0 && fallSpeed.current > 0) {
                    // Falling Down -> Reset to top
                    monitorOffsets.current[index] += totalHeight;
                } else if (currentY > totalHeight - 10.0 && fallSpeed.current < 0) {
                    // Moving Up -> Reset to bottom
                    monitorOffsets.current[index] -= totalHeight;
                }

                // Direct DOM update - bypass React reconciliation for performance
                const ref = monitorRefs.current[index];
                if (ref) {
                    ref.position.y = monitor.baseY + monitorOffsets.current[index];
                }
            });

            // Update particle refs directly (no setState = no re-render = smooth!)
            particleTowerRotation.current = towerRef.current.rotation.y;
            particleFallOffset.current = fallSpeed.current; // Pass velocity, not offset!
        }
    });

    return (
        <group ref={groupRef} position={[0, -1.2, 0]}>
            {!isWarmup && (
                <PositionalAudio
                    ref={audioRef}
                    url="/sounds/szummonitorow.mp3"
                    distanceModel="exponential"
                    refDistance={AUDIO_SETTINGS.distance}
                    rolloffFactor={AUDIO_SETTINGS.rolloff}
                    loop
                    autoplay
                    volume={effectiveVolume}
                />
            )}

            {/* THE INFINITE TOWER */}
            <group
                ref={towerRef}
                position={[0, TOWER_Y_START, TOWER_Z_START]}
                onPointerDown={handlePointerDown}
            >
                {/* Invisible Hit Cylinder for easier drag interaction */}
                <mesh visible={false}>
                    <cylinderGeometry args={[responsiveParams.towerRadius + 0.5, responsiveParams.towerRadius + 0.5, TOWER_HEIGHT * 1.5, 16]} />
                    <meshBasicMaterial color="#fcf3c6" />
                </mesh>

                {monitors.map((item, index) => (
                    <MonitorBlock
                        key={`${item.id}-${index}`}
                        item={item}
                        index={index}
                        meshRef={(el) => { monitorRefs.current[index] = el; }}
                        isSelected={selectedMonitor?.id === item.id}
                        onMonitorClick={handleMonitorClick}
                        disabled={isAnimating}
                        paintOnBeforeCompile={paintOnBeforeCompile}
                        paintUniforms={paintUniforms}
                    />
                ))}
            </group>

            {/* Floating code symbols parallax background */}
            <FloatingCodeParticles
                towerRotationRef={particleTowerRotation}
                fallOffsetRef={particleFallOffset}
            />
        </group>
    );
};

// ===========================================
// COLOUR BRICK COMPONENT - with Color Intensification on Hover
// Solid tactile 3D brick with hand-drawn sketch wireframe and smooth GSAP color transition
// ===========================================
const MonitorBlock = memo(({ item, meshRef, isSelected, onMonitorClick, disabled, paintOnBeforeCompile, paintUniforms }) => {
    const isTouch = isTouchDevice();
    const isHoveredRef = useRef(false);
    const brickMatRef = useRef();

    // Base color (idle state) and vibrant color (hover state)
    const baseColorHex = item.baseColor || '#f4ede1';
    const hoverColorHex = item.color || '#00D9FF';

    // Color intensification handler on hover / select
    const updateBrickColor = useCallback(() => {
        if (!brickMatRef.current) return;
        const shouldIntensify = !isTouch && (isHoveredRef.current || isSelected);
        const targetColor = new THREE.Color(shouldIntensify ? hoverColorHex : baseColorHex);
        
        gsap.to(brickMatRef.current.color, {
            r: targetColor.r,
            g: targetColor.g,
            b: targetColor.b,
            duration: shouldIntensify ? 0.45 : 0.4,
            ease: 'power2.out',
            overwrite: true
        });
    }, [isSelected, isTouch, hoverColorHex, baseColorHex]);

    useEffect(() => {
        updateBrickColor();
    }, [isSelected, updateBrickColor]);

    // Edges geometry for hand-drawn sketch wireframe border around brick
    const edgesGeo = useMemo(() => {
        return new THREE.EdgesGeometry(new THREE.BoxGeometry(item.width, item.height, item.depth));
    }, [item.width, item.height, item.depth]);

    // Ensure floating card is wide enough so names never overflow
    const badgeWidth = Math.max(1.85, item.width * 0.95);

    return (
        <group
            ref={meshRef}
            position={[item.x, item.baseY, item.z]}
            rotation={[0, item.rot, 0]}
            onPointerOver={(e) => {
                if (disabled) return;
                e.stopPropagation();
                isHoveredRef.current = true;
                updateBrickColor();
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                isHoveredRef.current = false;
                updateBrickColor();
                document.body.style.cursor = 'auto';
            }}
            onPointerUp={(e) => {
                if (disabled) return;
                e.stopPropagation();
                onMonitorClick(item);
            }}
        >
            {/* SOLID COLOUR BRICK */}
            <mesh frustumCulled={false}>
                <boxGeometry args={[item.width, item.height, item.depth]} />
                <meshBasicMaterial
                    ref={brickMatRef}
                    color={baseColorHex}
                    transparent={true}
                    opacity={0.96}
                    onBeforeCompile={paintOnBeforeCompile}
                />
            </mesh>

            {/* HAND-DRAWN SKETCH WIREFRAME OUTLINE AROUND BRICK */}
            <lineSegments geometry={edgesGeo} frustumCulled={false}>
                <lineBasicMaterial color="#1a1a1a" transparent={true} opacity={0.65} linewidth={1.5} />
            </lineSegments>

            {/* FLOATING CARD WITH NAME ON UI (Properly contained bounds) */}
            <group position={[0, item.height / 2 + 0.28, 0]}>
                {/* Paper card background */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[badgeWidth, 0.38]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.96} side={THREE.DoubleSide} />
                </mesh>
                {/* Torn paper sketch border */}
                <mesh position={[0, 0, -0.005]}>
                    <planeGeometry args={[badgeWidth + 0.05, 0.43]} />
                    <meshBasicMaterial color="#1a1a1a" transparent opacity={0.88} side={THREE.DoubleSide} />
                </mesh>
                <Text
                    position={[0, 0, 0.02]}
                    fontSize={0.11}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/CabinSketch-Bold.ttf"
                    maxWidth={badgeWidth - 0.25}
                    textAlign="center"
                >
                    {item.floatingName || item.title}
                </Text>
            </group>

            {/* Crisp, sharp 3D vector text details rendered directly on brick face */}
            <ScreenTextDetails item={item} />
        </group>
    );
});

/**
 * ScreenTextDetails Component - Renders crystal clear vector 3D text safely within brick container
 */
const ScreenTextDetails = ({ item }) => {
    const isPhone = item.width < 0.8;

    if (isPhone) {
        return (
            <group position={[0, 0, item.depth / 2 + 0.02]}>
                <Text
                    position={[0, item.height * 0.35, 0]}
                    fontSize={0.048}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="top"
                    maxWidth={item.width * 0.82}
                    font="/fonts/CabinSketch-Bold.ttf"
                >
                    {`✦ ${item.badge || 'DETAILS'}`}
                </Text>
                <Text
                    position={[0, item.height * 0.20, 0]}
                    fontSize={0.055}
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="top"
                    maxWidth={item.width * 0.82}
                    maxLines={2}
                    font="/fonts/CabinSketch-Bold.ttf"
                    lineHeight={1.12}
                >
                    {item.title}
                </Text>
                <Text
                    position={[0, -item.height * 0.06, 0]}
                    fontSize={0.038}
                    color="#2a2a2a"
                    anchorX="center"
                    anchorY="top"
                    maxWidth={item.width * 0.82}
                    maxLines={3}
                    font="/fonts/CabinSketch-Regular.ttf"
                    lineHeight={1.2}
                >
                    {item.description}
                </Text>
            </group>
        );
    }

    return (
        <group position={[0, 0, item.depth / 2 + 0.02]}>
            <Text
                position={[-item.width * 0.42, item.height * 0.34, 0]}
                fontSize={0.075}
                color="#1a1a1a"
                anchorX="left"
                anchorY="top"
                maxWidth={item.width * 0.84}
                font="/fonts/CabinSketch-Bold.ttf"
            >
                {`✦ ${item.badge || 'DETAILS'} // ${item.date || ''}`}
            </Text>

            <Text
                position={[-item.width * 0.42, item.height * 0.17, 0]}
                fontSize={0.092}
                color="#1a1a1a"
                anchorX="left"
                anchorY="top"
                maxWidth={item.width * 0.84}
                maxLines={2}
                font="/fonts/CabinSketch-Bold.ttf"
                lineHeight={1.15}
            >
                {item.title}
            </Text>

            <Text
                position={[-item.width * 0.42, -item.height * 0.06, 0]}
                fontSize={0.065}
                color="#2a2a2a"
                anchorX="left"
                anchorY="top"
                maxWidth={item.width * 0.84}
                maxLines={3}
                font="/fonts/CabinSketch-Regular.ttf"
                lineHeight={1.22}
            >
                {item.description}
            </Text>
        </group>
    );
};

export default StudioRoom;


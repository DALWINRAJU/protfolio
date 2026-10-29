import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlightCards = [
  {
    title: "Full-Stack Development",
    desc: "Building responsive applications with React.js, Spring Boot, Java, Node.js, and RESTful API architecture."
  },
  {
    title: "UI/UX Design & Prototyping",
    desc: "Combining wireframing, prototyping in Figma, user research, and design thinking with clean frontend code."
  },
  {
    title: "Map & Proximity Integration",
    desc: "Developing interactive spatial applications using Leaflet.js, OpenStreetMap, and location recommendation logic."
  },
  {
    title: "Voice AI & Natural Language",
    desc: "Integrating Web Speech API and NLP capabilities into voice-enabled virtual assistants and productivity apps."
  },
  {
    title: "Database Management",
    desc: "Designing and managing relational MySQL databases with full CRUD operations and structured data schemas."
  },
  {
    title: "Agile & Collaborative Workflows",
    desc: "Experienced in Git version control, SDLC best practices, team stand-ups, and cross-functional project delivery."
  }
];

const stats = [
  { value: "4+", label: "Real-World Web Apps" },
  { value: "12+", label: "Technical Skills Mastered" },
  { value: "1st", label: "Prize Paper Presentation" },
  { value: "1", label: "Software Internship" },
  { value: "B.E.", label: "CSE Final Year Student" }
];

export default function About() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Fade in left column on scroll
    gsap.fromTo(leftColRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Fade in highlight cards sequentially
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Fade in stats counter cards
    gsap.fromTo(statsRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--background-secondary)',
        borderTop: '1px solid var(--border-primary)',
        borderBottom: '1px solid var(--border-primary)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Grid: Biography & Highlight Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '60px',
            marginBottom: '70px'
          }}
          className="about-grid"
        >
          {/* Left Column - Biography & Mission */}
          <div
            ref={leftColRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            {/* 1. Small section label */}
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              ABOUT DALWINRAJU R // SOFTWARE DEVELOPER & UI/UX DESIGNER
            </p>

            {/* 2. Large heading */}
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                lineHeight: 1.12,
                fontWeight: 500,
                marginBottom: '28px'
              }}
            >
              Translating Design Concepts into Clean Code.<br />
              <span className="text-gradient-purple">Where Full-Stack Engineering Meets Human-Centered UI/UX.</span>
            </h2>

            {/* 3. Premium Paragraphs */}
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                fontWeight: 300
              }}
            >
              I am Dalwinraju R, a motivated Software Developer, Frontend Developer, and UI/UX Designer based in Tamil Nadu, India. Currently in my final year of Bachelor of Engineering in Computer Science and Engineering at Government College of Engineering, Srirangam.
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                fontWeight: 300
              }}
            >
              I bring hands-on experience building responsive, user-centered web applications using React.js, Java, and Spring Boot. I specialize in combining strong UI/UX fundamentals — wireframing, prototyping in Figma, and user research — with full-stack development to deliver intuitive digital products.
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '36px',
                fontWeight: 300
              }}
            >
              With proven experience developing REST APIs, integrating relational databases, and shipping real-world projects independently and in Agile teams, I focus on writing clean, scalable, and maintainable code.
            </p>

            {/* 4. Personal Mission Statement */}
            <div
              className="glass-panel"
              style={{
                padding: '24px 28px',
                borderLeft: '4px solid var(--accent-primary)',
                backgroundColor: 'rgba(16, 16, 16, 0.6)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--accent-secondary)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                QUOTE & INSPIRATION
              </span>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.65,
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  margin: 0,
                  fontWeight: 400
                }}
              >
                "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution." — Albert Einstein
              </p>
            </div>
          </div>

          {/* Right Column - 5. Highlight Cards (6) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                margin: 0,
                textAlign: 'left',
                borderBottom: '1px solid var(--border-primary)',
                paddingBottom: '12px'
              }}
            >
              Core Capabilities & Focus
            </h3>
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {highlightCards.map((card, idx) => (
                <div
                  key={card.title}
                  ref={el => cardsRef.current[idx] = el}
                  className="glass-panel capability-card"
                  style={{
                    padding: '24px',
                    textAlign: 'left',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: '8px'
                      }}
                    >
                      {card.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        margin: 0,
                        fontWeight: 300
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achieved Prizes & Recognitions Grid */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-primary)',
            paddingBottom: '12px'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              margin: 0
            }}>
              🏆 Achieved Prizes & Symposium Recognitions
            </h3>
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--accent-primary)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              State-Level & International
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                badge: '1ST PRIZE',
                badgeBg: 'rgba(0, 217, 255, 0.15)',
                badgeColor: 'var(--accent-primary)',
                title: 'Intra College Hackathon',
                place: 'Government College of Engineering, Srirangam',
                detail: 'Won 1st Prize in Intra Hackathon for developing full-stack problem-solving software under tight competition deadlines.'
              },
              {
                badge: '1ST PRIZE',
                badgeBg: 'rgba(0, 217, 255, 0.15)',
                badgeColor: 'var(--accent-primary)',
                title: 'Paper Presentation',
                place: 'Thanjavur Government College Symposium',
                detail: 'Secured 1st Prize for research-driven paper presentation among competitive engineering college delegates.'
              },
              {
                badge: "INT'L CONCLAVE",
                badgeBg: 'rgba(168, 85, 247, 0.15)',
                badgeColor: '#c084fc',
                title: 'Research Paper Presentation',
                place: 'Tamil Nadu Dr. Ambedkar Law Univ & Anna University',
                detail: 'Successfully presented research paper at international conclave conducted in collaboration with Anna University, Chennai.'
              },
              {
                badge: '2ND PRIZE',
                badgeBg: 'rgba(0, 217, 255, 0.12)',
                badgeColor: 'var(--accent-secondary)',
                title: 'Paper Presentation',
                place: 'Kalasalingam University Symposium',
                detail: 'Awarded 2nd Prize for comprehensive technical presentation and engineering architectural analysis.'
              },
              {
                badge: '2ND PRIZE',
                badgeBg: 'rgba(0, 217, 255, 0.12)',
                badgeColor: 'var(--accent-secondary)',
                title: 'Knowledge Battle',
                place: 'Dharmapuri Government College Symposium',
                detail: 'Secured 2nd Prize runner-up in high-intensity technical knowledge battle and algorithmic problem solving.'
              },
              {
                badge: '3RD PRIZE',
                badgeBg: 'rgba(255, 255, 255, 0.08)',
                badgeColor: 'var(--text-secondary)',
                title: 'Paper Presentation',
                place: 'Dharmapuri Government College Symposium',
                detail: 'Awarded 3rd Prize in state-level symposium paper presentation contest.'
              }
            ].map((prize, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '22px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'rgba(18, 18, 18, 0.6)',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: prize.badgeBg,
                    color: prize.badgeColor,
                    letterSpacing: '0.8px'
                  }}>
                    {prize.badge}
                  </span>
                </div>
                <h4 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  {prize.title}
                </h4>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 500,
                  margin: 0
                }}>
                  {prize.place}
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 300
                }}>
                  {prize.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Statistics Section */}
        <div
          style={{
            borderTop: '1px solid var(--border-primary)',
            borderBottom: '1px solid var(--border-primary)',
            padding: '40px 0',
            marginBottom: '50px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                ref={el => statsRef.current[idx] = el}
                className="glass-panel"
                style={{
                  padding: '20px 16px',
                  backgroundColor: 'rgba(16, 16, 16, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Skills Summary & 8. Closing Statement */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          {/* Skills Summary Tag */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {['React.js', 'Spring Boot', 'Java', 'JavaScript', 'MySQL', 'REST APIs', 'UI/UX Design', 'Wireframing', 'Figma', 'Leaflet.js', 'Bootstrap', 'Agile SDLC'].map(skill => (
              <span
                key={skill}
                style={{
                  fontSize: '0.82rem',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(0, 217, 255, 0.08)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--accent-secondary)',
                  fontWeight: 500
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Closing Statement */}
          <p
            style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              marginTop: '10px',
              letterSpacing: '0.5px'
            }}
          >
            "Building impactful, user-centered digital applications with clean, maintainable code."
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
        .capability-card {
          border-left: 3px solid var(--border-primary) !important;
        }
        .capability-card:hover {
          border-left-color: var(--accent-primary) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

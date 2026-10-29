import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(leftColRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(rightColRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dalwinraju2006@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        borderBottom: '1px solid var(--border-primary)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '60px',
            alignItems: 'start',
          }}
          className="contact-layout-grid"
        >
          {/* Left Column - Contact Identity */}
          <div
            ref={leftColRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            {/* Status indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(16, 16, 16, 0.6)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '20px',
                width: 'fit-content',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}
            >
              <span className="pulse-dot" style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Open for Software Developer & UI/UX Roles
            </div>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              INITIATE CONTACT
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
                lineHeight: 1.1,
                fontWeight: 500,
                marginBottom: '24px'
              }}
            >
              Let's Connect &<br />
              <span className="text-gradient-purple">Build Great Software.</span>
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '36px',
                fontWeight: 300,
                maxWidth: '560px'
              }}
            >
              Seeking entry-level Software Developer, Frontend Developer, or UI/UX Designer roles. Reach out via email or phone to discuss projects and opportunities.
            </p>

            {/* Direct Email & Phone Card */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                marginBottom: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative'
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Direct Email Inquiries
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <a
                    href="mailto:dalwinraju2006@gmail.com"
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      letterSpacing: '0.5px'
                    }}
                    className="contact-email-link"
                  >
                    dalwinraju2006@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    style={{
                      fontSize: '0.8rem',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-primary)',
                      backgroundColor: 'rgba(0, 217, 255, 0.1)',
                      color: 'var(--accent-secondary)',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="copy-btn-hover"
                  >
                    {copied ? '✓ Copied' : 'Copy Email'}
                  </button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Phone / Mobile
                </span>
                <a
                  href="tel:7598939521"
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}
                  className="contact-email-link"
                >
                  +91 7598939521
                </a>
              </div>
            </div>

            {/* Location & Social Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Location
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Tamil Nadu, India 🇮🇳
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Socials & Links
                </span>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com/DALWINRAJU"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}
                    className="contact-item-hover"
                    aria-label="GitHub Profile"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dalwinraju-r/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}
                    className="contact-item-hover"
                    aria-label="LinkedIn Profile"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Form */}
          <div ref={rightColRef} style={{ display: 'flex', justifyContent: 'center' }}>
            <ContactForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-layout-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
        .contact-item-hover:hover {
          color: var(--accent-primary) !important;
        }
        .contact-email-link:hover {
          color: var(--accent-primary) !important;
        }
        .copy-btn-hover:hover {
          border-color: var(--accent-secondary) !important;
          background-color: rgba(0, 217, 255, 0.2) !important;
        }
      `}</style>
    </section>
  );
}

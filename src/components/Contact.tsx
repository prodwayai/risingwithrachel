import React from 'react';
import Reveal from './Reveal';
import IntakeForm from './IntakeForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="rwr-section rwr-contact">
      <div className="rwr-container">
        <Reveal className="rwr-section-head is-center">
          <span className="rwr-eyebrow">Get in touch</span>
          <h2 className="rwr-h2">Start your coaching journey</h2>
          <p className="rwr-lead" style={{ marginTop: 16 }}>
            Tell me about your goals and I'll be in touch personally to talk through how we can work together.
          </p>
        </Reveal>

        <div className="rwr-contact-grid">
          <Reveal>
            <div className="rwr-info-card">
              <h3>Let's talk running</h3>
              <p className="sub">A quick note about where you are and where you want to go is all I need.</p>

              <div className="rwr-info-item">
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div><b>Raleigh, North Carolina</b><span>Virtual coaching available nationwide</span></div>
              </div>

              <div className="rwr-info-socials">
                <a href="https://www.instagram.com/rachelontherun_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rwr-form-card">
              <h3>Send an inquiry</h3>
              <p className="sub">No commitment — just the start of a conversation.</p>
              <IntakeForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

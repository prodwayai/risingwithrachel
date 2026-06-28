import React from 'react';
import Reveal from './Reveal';

const About: React.FC = () => {
  return (
    <section id="about" className="rwr-section rwr-about">
      <div className="rwr-container">
        <div className="rwr-about-grid">
          <Reveal className="rwr-about-figure">
            <img src="/images/rain.jpeg" alt="Rachel training in the rain" />
            <div className="tag">
              <b>BQ</b>
              <span>3× Qualifier</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="rwr-eyebrow">About Rachel</span>
            <h2 className="rwr-h2">A coach who has run every mile she asks of you</h2>
            <p style={{ marginTop: 22 }}>
              I'm a running coach with over a decade of experience as both an athlete and mentor.
              My own journey has carried me through 10+ marathons — Boston, Chicago, Houston and beyond —
              and taught me that the right plan, paced patiently, changes everything.
            </p>

            <div className="rwr-cards-2">
              <div className="rwr-mini-card">
                <h4>Qualifications</h4>
                <ul>
                  <li>B.S. Exercise Science, American Public University</li>
                  <li>Three-time Boston Marathon qualifier</li>
                  <li>10+ full marathons completed</li>
                </ul>
              </div>
              <div className="rwr-mini-card">
                <h4>Coaching</h4>
                <ul>
                  <li>Girls on the Run of the Triangle</li>
                  <li>Miracle League of the Triangle (10+ yrs)</li>
                  <li>Personalized 1:1 run coaching</li>
                </ul>
              </div>
            </div>

            <p>
              I believe running is for everyone. My philosophy centers on building sustainable habits,
              preventing injury, and helping you reach your personal best — whether that's your first 5K
              or a Boston qualifying time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;

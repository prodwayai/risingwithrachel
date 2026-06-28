import React from 'react';
import Reveal from './Reveal';

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SERVICES = [
  {
    title: 'Personalized Coaching',
    body: 'One-on-one coaching built entirely around your goals, schedule, and body. We refine form, build endurance, and keep you healthy along the way.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /><path d="m17 8 2 2 3-3" />
      </svg>
    ),
    features: ['Custom training plans', 'Form & technique analysis', 'Race strategy development', 'Recovery & injury prevention', 'Virtual or in-person sessions'],
  },
  {
    title: 'Marathon Expertise',
    body: "Training for your first marathon or chasing a Boston qualifier? I bring lessons from 10+ marathons across the World Majors directly to your plan.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V2h12v7a6 6 0 0 1-12 0Z" /><path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 22h6M12 15v7" />
      </svg>
    ),
    features: ['Marathon-specific training', 'Race-day preparation', 'Pacing strategy', 'Fueling & nutrition planning', 'Mental preparation'],
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="rwr-section rwr-services">
      <div className="rwr-container">
        <Reveal className="rwr-section-head is-center">
          <span className="rwr-eyebrow">What I offer</span>
          <h2 className="rwr-h2">1:1 run coaching, tailored to you</h2>
          <p className="rwr-lead" style={{ marginTop: 16 }}>
            Personalized programming for every kind of runner — from first-timers to those rewriting their PRs.
          </p>
        </Reveal>

        <div className="rwr-services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <article className="rwr-service">
                <div className="rwr-service-ico">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="rwr-feature-list">
                  {s.features.map((f) => (
                    <li key={f}><Check />{f}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="rwr-services-cta" delay={0.1}>
          <p>For detailed pricing, reach out below — every plan is quoted to fit your goals.</p>
          <a className="rwr-btn rwr-btn--ink" href="#contact">Get started today</a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;

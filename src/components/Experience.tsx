import React from 'react';
import Reveal from './Reveal';
import Counter from './Counter';

const RACES = [
  { title: 'Boston Marathon', year: 'World Major', desc: 'Qualified and raced the historic course from Hopkinton to Boylston Street multiple times.' },
  { title: 'Chicago Marathon', year: 'World Major', desc: 'The flat, fast tour through 29 neighborhoods of the Windy City.' },
  { title: 'Berlin Marathon', year: 'Qualified', desc: "Earned a place at the fastest of the World Majors, finishing through the Brandenburg Gate." },
  { title: 'Houston Marathon', year: 'PR Course', desc: 'A fast, flat course known for ideal racing conditions.' },
  { title: 'City of Oaks', year: 'Raleigh, NC', desc: 'The hometown race, winding through Raleigh\u2019s oak-lined greenways.' },
  { title: 'Austin Marathon', year: 'Austin, TX', desc: 'Conquered the rolling hills amid a music-filled Texas atmosphere.' },
];

const STATS = [
  { to: 10, suffix: '+', label: 'Marathons completed' },
  { to: 4, suffix: '', label: 'World Marathon Majors' },
  { to: 3, suffix: '×', label: 'Boston qualifications' },
  { to: 10, suffix: '+', label: 'Years coaching' },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="rwr-section rwr-exp">
      <div className="rwr-container">
        <Reveal className="rwr-section-head">
          <span className="rwr-eyebrow">Experience & achievements</span>
          <h2 className="rwr-h2">Miles that became method</h2>
          <p className="rwr-lead" style={{ marginTop: 16 }}>
            A decade of racing the world's great marathons — and coaching runners of every level back home.
          </p>
        </Reveal>

        <div className="rwr-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="rwr-stat">
              <div className="n"><Counter to={s.to} suffix={s.suffix} /></div>
              <div className="l">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <div className="rwr-timeline">
          {RACES.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 0.08} y={18}>
              <div className="rwr-race">
                <span className="dot" aria-hidden="true" />
                <div style={{ flex: 1 }}>
                  <div className="race-top">
                    <h4>{r.title}</h4>
                    <span className="yr">{r.year}</span>
                  </div>
                  <p>{r.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="rwr-hero">
      <div className="rwr-container rwr-hero-grid">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span className="rwr-hero-kicker" variants={item}>
            Raleigh, NC · Coaching anywhere
          </motion.span>

          <motion.h1 variants={item}>
            Rise to your<br />running <em>potential</em>
          </motion.h1>

          <motion.p className="rwr-hero-sub" variants={item}>
            Personalized 1:1 coaching from a multi-time Boston Marathon qualifier.
            Train smarter, stay injury-free, and chase the finish line that scares you.
          </motion.p>

          <motion.div className="rwr-hero-actions" variants={item}>
            <a className="rwr-btn rwr-btn--solid" href="#contact">
              Start your journey
              <svg className="rwr-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a className="rwr-btn rwr-btn--ghost-light" href="#services">View services</a>
          </motion.div>

          <motion.div className="rwr-hero-meta" variants={item}>
            <div><div className="n">10+</div><div className="l">Marathons run</div></div>
            <div><div className="n">3×</div><div className="l">Boston qualifier</div></div>
            <div><div className="n">10+ yrs</div><div className="l">Coaching</div></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="rwr-hero-figure"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <img src="/images/boston.jpeg" alt="Rachel racing the Boston Marathon" />
          <motion.div
            className="rwr-hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ico" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9V2h12v7a6 6 0 0 1-12 0Z" /><path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 22h6M12 15v7" />
              </svg>
            </span>
            <div>
              <b>Boston · Chicago · Berlin</b>
              <span>World Major experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="rwr-hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#fffdfa" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,77.3C1120,80,1280,64,1360,56L1440,48L1440,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

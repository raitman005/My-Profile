import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const skills = [
  { name: 'WordPress', level: 90 },
  { name: 'Shopify Liquid', level: 85 },
  { name: 'PHP / Laravel', level: 80 },
  { name: 'HTML5 / CSS3', level: 92 },
  { name: 'JavaScript', level: 75 },
  { name: 'MySQL', level: 70 },
  { name: 'ReactJS', level: 60 },
  { name: 'On-Page SEO', level: 78 },
];

const experiences = [
  {
    role: 'Web Developer',
    company: 'zeWebcomm Inc.',
    period: '2019 — 2025',
    desc: 'Customized Shopify Liquid themes, developed custom WordPress plugins, managed SEO and page performance for various clients.',
  },
  {
    role: 'IT Assistant',
    company: 'Current Utilities, Inc.',
    period: '2017 — 2019',
    desc: 'Developed company website, maintained software systems, installed and configured hardware and software.',
  },
  {
    role: 'Front-End Developer',
    company: 'Neofuture System Solutions, Inc.',
    period: '2014 — 2016',
    desc: 'Converted PSD designs to responsive HTML5/CSS3, built ecommerce websites from scratch, self-learned Laravel PHP framework.',
  },
];

function Home() {
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );
    barsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1"></div>
          <div className="hero-orb orb2"></div>
        </div>
        <div className="hero-content">
          <span className="hero-tag">Available for Work</span>
          <h1 className="hero-name">
            Marc Justin<br /><em>Rait</em>
          </h1>
          <p className="hero-role">Web Developer</p>
          <p className="hero-location">📍 Olongapo, Philippines</p>
          <p className="hero-desc">
            Building clean, functional, and responsive web experiences across WordPress, Shopify, and beyond.
            Passionate about writing code that solves real problems for real clients.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="btn-primary">View My Work</Link>
            <Link to="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-frame">
            <img src="/images/me.jpg" alt="Marc Justin Rait" />
            <div className="image-border"></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="section-label">About Me</div>
        <div className="about-grid">
          <div className="about-text">
            <h2>A developer who builds with purpose.</h2>
            <p>
              I'm a junior web developer based in Olongapo, Philippines with around 12 months of focused
              experience in WordPress custom plugin development and Shopify Liquid theme customization,
              backed by years of working on real-world client projects.
            </p>
            <p>
              I take pride in writing clean, reusable code and delivering work that is both technically sound
              and visually consistent. I'm currently expanding my skills into Webflow and modern development
              workflows, always looking to grow alongside talented teams.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-num">5+</span>
                <span className="stat-label">Years in Industry</span>
              </div>
              <div className="stat">
                <span className="stat-num">3</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat">
                <span className="stat-num">∞</span>
                <span className="stat-label">Drive to Learn</span>
              </div>
            </div>
          </div>
          <div className="skills-list">
            {skills.map((skill, i) => (
              <div key={i} className="skill-item">
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <div className="skill-track">
                  <div
                    className="skill-bar"
                    ref={(el) => (barsRef.current[i] = el)}
                    style={{ '--target': `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Where I've Worked</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">{exp.period}</span>
                <h3>{exp.role}</h3>
                <span className="timeline-company">{exp.company}</span>
                <p>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Ready to build something great?</h2>
          <p>I'm open to freelance projects, full-time roles, and collaborative opportunities.</p>
          <Link to="/contact" className="btn-primary">Let's Talk</Link>
        </div>
      </section>

    </main>
  );
}

export default Home;

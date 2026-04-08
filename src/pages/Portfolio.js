import React, { useState } from 'react';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Lips Like Home',
    category: 'Shopify',
    tags: ['Shopify', 'Liquid', 'Ecommerce'],
    url: 'https://lipslikehome.com',
    image: process.env.PUBLIC_URL +'/images/lipslikehome.png',
    /* Image keyword: "luxury lip serum skincare ecommerce website screenshot" */
    desc: 'Swiss-made luxury lip care brand. Customized Shopify Liquid theme, tailored product pages, and ensured a seamless multi-currency shopping experience.',
  },
  {
    id: 2,
    title: 'Cleanspiracy Beauty',
    category: 'Shopify',
    tags: ['Shopify', 'Liquid', 'Skincare'],
    url: 'https://cleanspiracy-beauty.com',
    image: process.env.PUBLIC_URL +'/images/cleanspiracy.png',
    /* Image keyword: "acne treatment skincare ecommerce website screenshot" */
    desc: 'Swiss acne treatment brand. Built and customized Shopify store with before/after sections, clinical study pages, and conversion-focused product layout.',
  },
  {
    id: 3,
    title: 'WordPress Plugin',
    category: 'WordPress',
    tags: ['WordPress', 'PHP', 'Plugin'],
    url: '#',
    image: process.env.PUBLIC_URL +'/images/wordpress-plugin.png',
    /* Image keyword: "wordpress dashboard custom plugin development code" */
    desc: 'Developed a custom WordPress plugin from scratch that allows post types to be scheduled or published randomly, solving a recurring client content management need.',
  },
  {
    id: 4,
    title: 'Responsive Ecommerce Site',
    category: 'Frontend',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    url: '#',
    image: process.env.PUBLIC_URL +'/images/ecommerce-frontend.png',
    /* Image keyword: "responsive ecommerce website design html css frontend" */
    desc: 'Built a fully responsive ecommerce website from scratch with pixel-perfect HTML5 and CSS3, converted from PSD design mockups.',
  },
  // {
  //   id: 5,
  //   title: 'Content Management System',
  //   category: 'WordPress',
  //   tags: ['WordPress', 'PHP', 'Laravel'],
  //   url: '#',
  //   image: '/images/cms-project.jpg',
  //   /* Image keyword: "content management system dashboard web application" */
  //   desc: 'Researched, tested, and delivered an internal CMS for a client, integrating custom content delivery logic using PHP and WordPress.',
  // },
  {
    id: 5,
    title: 'Company Website',
    category: 'Frontend',
    tags: ['HTML5', 'CSS3', 'SEO'],
    url: '#',
    image: process.env.PUBLIC_URL +'/images/company-website.png',
    /* Image keyword: "professional corporate company website design modern" */
    desc: 'Developed a professional business website with SEO optimization, improving the company\'s visibility on Google search results.',
  },
];

const filters = ['All', 'Shopify', 'WordPress', 'Frontend'];

function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <main className="portfolio-page">
      <div className="portfolio-header">
        <span className="section-label">My Work</span>
        <h1>Selected Projects</h1>
        <p>A collection of real-world client work across WordPress, Shopify, and frontend development.</p>
      </div>

      <div className="portfolio-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                {project.url !== '#' && (
                  <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                    Visit Site ↗
                  </a>
                )}
              </div>
            </div>
            <div className="project-info">
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Portfolio;

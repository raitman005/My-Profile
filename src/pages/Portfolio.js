import React, { useState, useEffect, useCallback } from 'react';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Lips Like Home',
    category: 'Shopify',
    tags: ['Shopify', 'Liquid', 'Ecommerce'],
    url: 'https://lipslikehome.com',
    images: [
      process.env.PUBLIC_URL + '/images/lipslikehome.png',
      process.env.PUBLIC_URL + '/images/lipslikehome-2.png',
    ],
    desc: 'Swiss-made luxury lip care brand. Customized Shopify Liquid theme, tailored product pages, and ensured a seamless multi-currency shopping experience.',
  },
  {
    id: 2,
    title: 'Cleanspiracy Beauty',
    category: 'Shopify',
    tags: ['Shopify', 'Liquid', 'Skincare'],
    url: 'https://cleanspiracy-beauty.com',
    images: [
      process.env.PUBLIC_URL + '/images/cleanspiracy.png',
      process.env.PUBLIC_URL + '/images/cleanspiracy-2.png',
    ],
    desc: 'Swiss acne treatment brand. Built and customized Shopify store with before/after sections, clinical study pages, and conversion-focused product layout.',
  },
  {
    id: 3,
    title: 'WordPress Plugin',
    category: 'WordPress',
    tags: ['WordPress', 'PHP', 'Plugin'],
    url: '#',
    images: [
      process.env.PUBLIC_URL + '/images/wordpress-plugin.png'
    ],
    desc: 'Developed a custom WordPress plugin from scratch that allows post types to be scheduled or published randomly, solving a recurring client content management need.',
  },
  {
    id: 4,
    title: 'Responsive Ecommerce Site',
    category: 'Frontend',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    url: '#',
    images: [
      process.env.PUBLIC_URL + '/images/ecommerce-frontend.png'
    ],
    desc: 'Built a fully responsive ecommerce website from scratch with pixel-perfect HTML5 and CSS3, converted from PSD design mockups.',
  },
  {
    id: 5,
    title: 'Company Website',
    category: 'Frontend',
    tags: ['HTML5', 'CSS3', 'SEO'],
    url: '#',
    images: [
      process.env.PUBLIC_URL + '/images/company-website.png'
    ],
    desc: "Developed a professional business website with SEO optimization, improving the company's visibility on Google search results.",
  },
  {
    id: 6,
    title: 'To Do List',
    category: 'Frontend',
    tags: ['HTML5', 'CSS3', 'ReactJS'],
    url: '#',
    images: [
      process.env.PUBLIC_URL + '/images/to-do-list.png',
      process.env.PUBLIC_URL + '/images/to-do-list-2.png',
    ],
    desc: "Developed a responsive To-Do List web application using ReactJS that allows users to efficiently manage their daily tasks. The application enables users to add, edit, complete, and delete tasks with real-time UI updates using React state management. Built with a component-based architecture to ensure clean, reusable code and a smooth user experience. This project demonstrates my understanding of React fundamentals such as functional components, hooks, and dynamic rendering.",
  },
];

const filters = ['All', 'Shopify', 'WordPress', 'Frontend'];

/* ─── Lightbox Component ─────────────────────────────────────── */
function Lightbox({ project, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const images = project.images;

  const navigate = useCallback(
    (dir) => {
      setCurrentIndex((prev) => Math.max(0, Math.min(images.length - 1, prev + dir)));
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="lightbox-header">
          <div className="lightbox-title-group">
            <span className="lightbox-title">{project.title}</span>
            <span className="lightbox-counter">
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>
          <button className="lightbox-close" onClick={onClose}>✕</button>
        </div>

        {/* Main Image */}
        <div className="lightbox-main-image">
          <button
            className="lightbox-nav prev"
            onClick={() => navigate(-1)}
            disabled={currentIndex === 0}
          >
            ‹
          </button>

          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${project.title} screenshot ${currentIndex + 1}`}
          />

          <button
            className="lightbox-nav next"
            onClick={() => navigate(1)}
            disabled={currentIndex === images.length - 1}
          >
            ›
          </button>
        </div>

        {/* Thumbnails — only shown when there are multiple images */}
        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((src, i) => (
              <div
                key={i}
                className={`lightbox-thumb ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="lightbox-footer">
          <p className="lightbox-desc">{project.desc}</p>
          {project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="lightbox-visit-link"
            >
              Visit Site ↗
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

/* ─── Portfolio Component ────────────────────────────────────── */
function Portfolio() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null); // { project, startIndex }

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  const openLightbox = (project, startIndex = 0) => {
    setLightbox({ project, startIndex });
  };

  const closeLightbox = () => setLightbox(null);

  return (
    <main className="portfolio-page">
      <div className="portfolio-header">
        <span className="section-label">My Work</span>
        <h1>Selected Projects</h1>
        <p>A collection of real-world client work across WordPress, Shopify, and frontend development.</p>
      </div>

      {/* Filters */}
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

      {/* Project Grid */}
      <div className="projects-grid">
        {filtered.map((project) => (
          <div key={project.id} className="project-card">
            <div
              className="project-image"
              onClick={() => openLightbox(project, 0)}
            >
              <img src={project.images[0]} alt={project.title} />

              {/* Badge shown when project has multiple images */}
              {project.images.length > 1 && (
                <div className="image-count-badge">
                  🖼 {project.images.length} images
                </div>
              )}

              <div className="project-overlay">
                <button className="overlay-btn gallery">View Gallery</button>
                {project.url !== '#' && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="overlay-btn visit"
                    onClick={(e) => e.stopPropagation()}
                  >
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

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          project={lightbox.project}
          startIndex={lightbox.startIndex}
          onClose={closeLightbox}
        />
      )}
    </main>
  );
}

export default Portfolio;
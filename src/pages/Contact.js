import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const SERVICE_ID  = 'service_eu2avor';
const TEMPLATE_ID = 'template_7bhb67x';
const PUBLIC_KEY  = '_TSvIz6ClsUOPnbz0';

function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   'justinraitman005@gmail.com',
        },
        PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again or email me directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-header">
        <span className="section-label">Get In Touch</span>
        <h1>Let's Work Together</h1>
        <p>Open to freelance projects, full-time roles, and collaborative opportunities.</p>
      </div>

      <div className="contact-grid">

        {/* LEFT INFO */}
        <div className="contact-info">
          <div className="info-block">
            <span className="info-label">Email</span>
            <a href="mailto:justinraitman005@gmail.com" className="info-value">
              justinraitman005@gmail.com
            </a>
          </div>
          <div className="info-block">
            <span className="info-label">Phone</span>
            <a href="tel:+639672795501" className="info-value">+63 967 279 5501</a>
          </div>
          <div className="info-block">
            <span className="info-label">Location</span>
            <span className="info-value">Olongapo, Philippines</span>
          </div>
          <div className="info-block">
            <span className="info-label">Availability</span>
            <span className="info-value available">✦ Available for Work</span>
          </div>

          <div className="services">
            <span className="info-label">What I Can Help With</span>
            <ul>
              <li>WordPress Development & Custom Plugins</li>
              <li>Shopify Liquid Theme Customization</li>
              <li>Responsive Frontend Development</li>
              <li>On-Page SEO & Page Speed Optimization</li>
              <li>Website Maintenance & Bug Fixes</li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-wrap">
          {sent ? (
            <div className="success-msg">
              <span className="success-icon">✓</span>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text" name="name" placeholder="John Doe"
                    value={form.name} onChange={handle} required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email" name="email" placeholder="john@example.com"
                    value={form.email} onChange={handle} required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text" name="subject" placeholder="Project Inquiry"
                  value={form.subject} onChange={handle} required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message" rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={handle} required
                />
              </div>

              {error && <p className="error-msg">{error}</p>}

              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}

export default Contact;
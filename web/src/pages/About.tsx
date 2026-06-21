// src/pages/About.tsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import AboutHero from '../components/about/AboutHero';
import AboutBodyModelSection from '../components/about/AboutBodyModelSection';
import FeatureShowcase from '../components/about/FeatureShowcase';
import AgentShowcase from '../components/about/AgentShowcase';
import TechStackSection from '../components/about/TechStackSection';
import FAQSection from '../components/about/FAQSection';
import Footer from '../components/common/Footer';

export const About: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <Navbar />

      <AboutHero />

      <AboutBodyModelSection />

      <div style={{ borderBottom: '1px solid var(--border)', width: '100%', margin: '20px 0' }} />

      <FeatureShowcase />

      <div style={{ borderBottom: '1px solid var(--border)', width: '100%', margin: '20px 0' }} />

      <AgentShowcase />

      <div style={{ borderBottom: '1px solid var(--border)', width: '100%', margin: '20px 0' }} />

      <TechStackSection />

      <div style={{ borderBottom: '1px solid var(--border)', width: '100%', margin: '20px 0' }} />

      <FAQSection />

      <Footer />
    </div>
  );
};

export default About;

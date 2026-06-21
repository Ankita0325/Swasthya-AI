// src/pages/Landing.tsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import ParticleField from '../components/landing/ParticleField';
import HeroSection from '../components/landing/HeroSection';
import LandingFeatureGrid from '../components/landing/LandingFeatureGrid';
import LandingCTA from '../components/landing/LandingCTA';
import Footer from '../components/common/Footer';

export const Landing: React.FC = () => {
  return (
    <div
      className="landing-page-container"
      style={{
        backgroundColor: 'var(--bg)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Scrollable Public Navigation */}
      <Navbar />

      {/* Hero Section with Canvas Particle Background Layer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Interactive Canvas Background */}
        <ParticleField />

        {/* Hero Copy / CTA Overlays */}
        <HeroSection />
      </div>

      {/* Core Features Overview */}
      <LandingFeatureGrid />

      {/* CTA Box */}
      <LandingCTA />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
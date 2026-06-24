// src/components/about/TrackCards.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Rocket, Smartphone, Network, Zap, Mic, ExternalLink, ArrowRight, LayoutGrid, Palette, CheckCircle } from 'lucide-react';

// Define the content item types explicitly
type ContentType = 'paragraph' | 'header' | 'list' | 'code' | 'link';

interface TrackContentItem {
  type: ContentType;
  level?: number;
  text?: string;
  items?: string[];
  code?: string;
  url?: string;
  label?: string;
}

interface TrackCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: TrackContentItem[];
  demoLink?: string;
  techStack?: string[];
  color: string;
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1 } 
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  }
};

const renderContentItem = (item: TrackContentItem, color: string, idx: number) => {
  switch (item.type) {
    case 'header': {
      const HeaderTag = `h${Math.max(1, Math.min(item.level || 1, 6))}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const fontSize = item.level === 1 ? '18px' : '13px';
      const marginBottom = item.level === 1 ? '10px' : '8px';
      return React.createElement(
        HeaderTag,
        {
          key: idx,
          style: {
            fontSize,
            fontWeight: item.level === 1 ? 900 : 700,
            color: 'var(--text-primary)',
            margin: `0 0 ${marginBottom} 0`,
            letterSpacing: '-0.2px'
          }
        },
        item.text
      );
    }
    case 'paragraph':
      return <p key={idx} style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>{item.text}</p>;
    case 'list':
      return (
        <ul key={idx} style={{ listStyleType: 'none', paddingLeft: '4px', margin: '0 0 12px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {item.items?.map((li, i) => (
            <li key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ color: color, fontSize: '14px', lineHeight: 1 }}>•</span> {li}
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div key={idx} style={{ margin: '0 0 12px 0', position: 'relative' }}>
          <pre style={{ margin: 0, padding: '10px 12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', overflowX: 'auto', fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace', border: '1px solid var(--border)' }}>
            <code>{item.code}</code>
          </pre>
        </div>
      );
    case 'link':
      return (
        <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: color, textDecoration: 'none', margin: '0 0 12px 0', width: 'fit-content' }}>
          {item.label} <ExternalLink size={13} />
        </a>
      );
    default:
      return null;
  }
};

const TrackCard: React.FC<TrackCardProps> = ({
  icon,
  title,
  subtitle,
  content,
  demoLink,
  techStack = [],
  color
}) => {
  return (
    <motion.div 
      variants={cardVariants}
      whileHover="hover"
      style={{ 
        padding: '28px 24px', 
        backgroundColor: 'var(--surface)', 
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        minHeight: '400px',
        borderRadius: '24px',
        position: 'relative',
        cursor: 'default',
        overflow: 'hidden',
        minWidth: '280px',
        flex: 1,
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow, 0 4px 30px rgba(0, 0, 0, 0.05))'
      }}
    >
      {/* Dynamic Glow on Hover */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(800px circle at 50% 0%, ${color}15, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, gap: '10px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <motion.div 
            variants={{ hover: { scale: 1.1, rotate: 5, backgroundColor: `${color}20` } }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: '12px', 
              backgroundColor: `${color}15`, 
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: `1px solid ${color}30`,
              boxShadow: `0 0 15px ${color}15`
            }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
              {title}
            </h3>
            <p style={{ fontSize: '11px', color: color, margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', opacity: 0.9 }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Unified 'Applied' Badge */}
        <motion.span 
          whileHover={{ scale: 1.05 }}
          style={{ 
            fontSize: '10px', 
            fontWeight: 800, 
            color: color, 
            border: `1px solid ${color}40`,
            backgroundColor: `${color}10`, 
            padding: '4px 10px', 
            borderRadius: '99px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: `0 0 10px ${color}10`
          }}
        >
          <CheckCircle size={12} strokeWidth={2.5} /> Applied
        </motion.span>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', width: '100%', position: 'relative', zIndex: 1 }} />

      {/* Content Area */}
      <div 
        style={{ 
          flexGrow: 1, 
          position: 'relative', 
          zIndex: 1,
          overflowY: 'auto',
          paddingRight: '6px',
          maxHeight: '220px',
          scrollbarWidth: 'thin',
          scrollbarColor: `${color}50 transparent`
        }}
        className="custom-scroll"
      >
        {content.map((item, idx) => renderContentItem(item, color, idx))}
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', width: '100%', position: 'relative', zIndex: 1 }} />

      {/* Footer / Tech Stack */}
      <motion.div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {techStack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {techStack.slice(0, 4).map((tech, idx) => (
              <span 
                key={idx}
                style={{ 
                  fontSize: '10px', 
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                className="tech-badge"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', padding: '4px 6px' }}>
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {demoLink && (
          <motion.a 
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '13px', 
              fontWeight: 700, 
              color: color, 
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'color 0.2s ease'
            }}
            className="demo-link"
          >
            Live Demo <ArrowRight size={14} strokeWidth={2.5} />
          </motion.a>
        )}
      </motion.div>

      {/* Premium Glowing Border Effect on Hover */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          border: `1.5px solid ${color}40`,
          pointerEvents: 'none',
          zIndex: 2
        }}
      />
    </motion.div>
  );
};

export const TrackCards: React.FC = () => {
  const tracks: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    content: TrackContentItem[];
    techStack: string[];
    color: string;
  }[] = [
    {
      icon: <Rocket size={20} strokeWidth={2} />,
      title: 'Base44 Track',
      subtitle: 'Rapid Prototyping',
      content: [
        { type: 'paragraph' as const, text: 'Validated conversational onboarding and health-graph concept before the full build.' },
        { type: 'link' as const, label: '🌐 Live Demo', url: 'https://swasthya-smart-care.base44.app' },
        { type: 'header' as const, level: 2, text: 'Key Demonstrations:' },
        { type: 'list' as const, items: ['Conversational onboarding flow', 'Body heatmap concept', 'Family health graph visualization'] }
      ],
      techStack: ['Base44', 'Prototype', 'Rapid Feedback'],
      color: '#00D1FF'
    },
    {
      icon: <Smartphone size={20} strokeWidth={2} />,
      title: 'Expo Track',
      subtitle: 'Mobile Application',
      content: [
        { type: 'paragraph' as const, text: 'React Native + Expo with voice chatbot, 3D body heatmap, medicine tracker, and family QR system.' },
        { type: 'header' as const, level: 2, text: 'Key Integrations:' },
        { type: 'list' as const, items: ['Expo Router', 'Audio APIs', 'Three.js WebView', 'Expo Camera', 'EAS Builds'] }
      ],
      techStack: ['Expo', 'React Native', 'TypeScript'],
      color: '#A78BFA'
    },
    {
      icon: <Network size={20} strokeWidth={2} />,
      title: 'Neo4j AuraDB',
      subtitle: 'Graph Database',
      content: [
        { type: 'paragraph' as const, text: 'Memory-aware reasoning layer for symptom recurrence and family risk detection.' },
        { type: 'header' as const, level: 2, text: 'Core Queries:' },
        { type: 'code' as const, code: 'MATCH (u:User)-[:REPORTED]->(e:SymptomEvent)\nRETURN e.date' },
        { type: 'code' as const, code: 'MATCH (u)-[:RELATED_TO]->(f)\nRETURN f.relation' }
      ],
      techStack: ['Neo4j', 'AuraDB', 'Cypher'],
      color: '#10B981'
    },
    {
      icon: <Zap size={20} strokeWidth={2} />,
      title: 'Render Workflows',
      subtitle: 'Agent Orchestration',
      content: [
        { type: 'paragraph' as const, text: 'Multi-stage workflow: voice → extraction → graph → risk → explanation → recommendation.' },
        { type: 'header' as const, level: 2, text: 'Pipeline Stages:' },
        { type: 'list' as const, items: ['Voice Input (STT)', 'Symptom Extraction', 'Graph Update', 'Risk Analysis'] }
      ],
      techStack: ['Render', 'Workflows', 'FastAPI'],
      color: '#FBBF24'
    },
    {
      icon: <Mic size={20} strokeWidth={2} />,
      title: 'Sarvam AI Track',
      subtitle: 'Voice & Multilingual',
      content: [
        { type: 'paragraph' as const, text: 'STT/TTS in Hindi, Marathi, and English for accessible voice-first healthcare.' },
        { type: 'header' as const, level: 2, text: 'Capabilities:' },
        { type: 'list' as const, items: ['Speech-to-Text', 'Text-to-Speech', 'Multilingual Support'] },
        { type: 'code' as const, code: 'Patient: "मुझे बुखार है" → STT\nAgent: "डॉक्टर से मिलें" → TTS' }
      ],
      techStack: ['Sarvam AI', 'STT/TTS', 'Multilingual'],
      color: '#F43F5E'
    }
  ];

  const renderTrackCard = (track: typeof tracks[0], index: number) => (
    <TrackCard
      key={index}
      icon={track.icon}
      title={track.title}
      subtitle={track.subtitle}
      content={track.content}
      techStack={track.techStack}
      color={track.color}
      demoLink={track.content.find(item => item.type === 'link')?.url}
    />
  );

  return (
    <section 
      id="tracks-section" 
      style={{ 
        width: '100%',
        minHeight: '100vh',
        padding: '40px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scrollMarginTop: '80px',
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)'
      }}
    >
      {/* Visible marker to help with section detection */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '2px',
        background: 'transparent',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 24px', boxSizing: 'border-box', width: '100%', position: 'relative' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '6px 16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '99px' }}>
            <LayoutGrid size={14} style={{ color: '#00D1FF' }} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#00D1FF', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              System Architecture
            </span>
          </div>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 16px 0', textAlign: 'center', letterSpacing: '-1px' }}>
            Our Development Tracks
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: 0, lineHeight: 1.6 }}>
            Five integrated technology tracks powering the connected ecosystem.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div 
          className="track-cards-desktop"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            boxSizing: 'border-box',
            paddingBottom: '24px'
          }}
        >
          {tracks.slice(0, 3).map(renderTrackCard)}
        </motion.div>
        
        <motion.div 
          className="track-cards-desktop"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            width: 'calc(66.66% + 8px)',
            margin: '24px auto 0 auto',
            boxSizing: 'border-box',
            paddingBottom: '24px'
          }}
        >
          {tracks.slice(3, 5).map(renderTrackCard)}
        </motion.div>

        {/* Mobile Horizontal Scroll */}
        <motion.div 
          className="track-cards-mobile hide-scrollbar"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ 
            display: 'none',
            gridTemplateColumns: 'repeat(5, 320px)',
            gap: '20px',
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 24px 40px 24px',
            scrollSnapType: 'x mandatory',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            margin: '0 -24px',
            scrollBehavior: 'smooth'
          }}
        >
          {tracks.map((track, index) => (
            <div key={index} style={{ scrollSnapAlign: 'center' }}>
              {renderTrackCard(track, index)}
            </div>
          ))}
        </motion.div>

        {/* Footer Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: '30px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '99px', border: '1px solid var(--border)' }}>
            <Palette size={14} style={{ color: 'var(--text-secondary)' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, margin: 0, letterSpacing: '0.3px' }}>
              Unified aesthetic across all modules
            </p>
          </div>
        </motion.div>

        {/* Global CSS Injections for Scrollbars & Utilities */}
        <style>{`
          .track-cards-mobile { display: none; }
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          
          .custom-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: var(--text-secondary);
          }

          .tech-badge:hover {
            background-color: var(--border) !important;
            color: var(--text-primary) !important;
          }
          
          .demo-link:hover {
            color: var(--text-primary) !important;
          }

          @media (max-width: 1024px) {
            .track-cards-desktop { display: none !important; }
            .track-cards-mobile { 
              display: grid !important;
              scroll-snap-type: x mandatory;
            }
            .track-cards-mobile > div {
              scroll-snap-align: center !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrackCards;
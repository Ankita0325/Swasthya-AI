// src/components/landing/InteractiveCursor.tsx
import React, { useEffect, useState, useRef } from 'react';
import './InteractiveCursor.css';

export const InteractiveCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // References to keep track of current coordinates without trigger loops
  const positionRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if it's a touch device
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchCheck);
    if (touchCheck) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      positionRef.current = newPos;
      setPosition(newPos);
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth lag/spring ring follow logic
  useEffect(() => {
    if (isTouchDevice) return;

    let frameId: number;

    const tick = () => {
      const targetX = positionRef.current.x;
      const targetY = positionRef.current.y;
      
      const currentX = ringRef.current.x;
      const currentY = ringRef.current.y;

      // Linear interpolation damping: 0.16 factor for smooth lag
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      
      const nextX = currentX + dx * 0.16;
      const nextY = currentY + dy * 0.16;

      ringRef.current = { x: nextX, y: nextY };
      setRingPosition({ x: nextX, y: nextY });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isTouchDevice]);

  // Hover detection for interactive items
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        target.style.cursor === 'pointer' ||
        target.classList.contains('interactive-hover');

      setHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isTouchDevice]);

  if (isTouchDevice || hidden) return null;

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} 
      />
      <div 
        className={`cursor-ring ${hovered ? 'hovered' : ''}`} 
        style={{ transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)` }} 
      />
    </>
  );
};

export default InteractiveCursor;

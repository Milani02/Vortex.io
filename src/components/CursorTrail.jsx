import React, { useEffect, useState, useRef } from 'react';

export default function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      trailRef.current.push(newPoint);
      if (trailRef.current.length > 20) trailRef.current.shift();
      setTrail([...trailRef.current]);
    };
    const handleMouseLeave = () => { trailRef.current = []; setTrail([]); };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" style={{ cursor: 'none' }}>
      {trail.map((point, index) => (
        <div 
          key={point.id} 
          className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-50" 
          style={{ 
            left: `${point.x}px`, 
            top: `${point.y}px`, 
            transform: `translate(-50%, -50%) scale(${1 - index / trail.length})`, 
            opacity: (trail.length - index) / trail.length, 
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' 
          }} 
        />
      ))}
      {trail.length > 0 && (
        <div 
          className="absolute h-3 w-3 rounded-full border border-cyan-400 bg-cyan-400/20" 
          style={{ 
            left: `${trail[trail.length - 1].x}px`, 
            top: `${trail[trail.length - 1].y}px`, 
            transform: 'translate(-50%, -50%)' 
          }} 
        />
      )}
    </div>
  );
}
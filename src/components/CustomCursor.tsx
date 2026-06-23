'use client';

import { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor ring
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Only show cursor on devices with a pointing device
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isVisible) return;

    // Apply global cursor-none safely
    document.body.classList.add('cursor-none');

    // Make all interactive elements magnetic
    const interactives = document.querySelectorAll('a, button, .magnetic');
    
    const handleMouseEnter = () => setIsHovering(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const hX = e.clientX - rect.left - rect.width / 2;
      const hY = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic pull effect on the element itself
      animate(el, { x: hX * 0.2, y: hY * 0.2 }, { type: "spring", stiffness: 150, damping: 15, mass: 0.1 });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      setIsHovering(false);
      const el = e.currentTarget as HTMLElement;
      // Release magnetic pull
      animate(el, { x: 0, y: 0 }, { type: "spring", stiffness: 150, damping: 15, mass: 0.1 });
    };

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mousemove', handleMouseMove as any);
      el.addEventListener('mouseleave', handleMouseLeave as any);
      // Ensure cursor is hidden over these elements too
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mousemove', handleMouseMove as any);
        el.removeEventListener('mouseleave', handleMouseLeave as any);
        (el as HTMLElement).style.cursor = '';
      });
      document.body.classList.remove('cursor-none');
    };
  }, [pathname, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer tracking ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 4 : 1,
          backgroundColor: isHovering ? '#C8102E' : '#ffffff',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

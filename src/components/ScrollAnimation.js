import React, { useEffect, useRef } from 'react';

const ScrollAnimation = ({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  threshold = 0.1,
  delay = 0,
  duration = 1000 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.style.transitionDelay = `${delay}ms`;
            element.style.transitionDuration = `${duration}ms`;
            element.classList.add('animate');
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, delay, duration]);

  return (
    <div 
      ref={elementRef}
      className={`animate-${animation} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation; 
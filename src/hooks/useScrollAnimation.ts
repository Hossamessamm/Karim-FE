import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            requestAnimationFrame(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            });
            observer.unobserve(element);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const elements = elementRef.current?.querySelectorAll('.course-card-animate');
    elements?.forEach((element, index) => {
      const el = element as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      el.style.transitionDelay = `${index * 150}ms`;
      observer.observe(element);
    });

    return () => {
      elements?.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return elementRef;
}; 
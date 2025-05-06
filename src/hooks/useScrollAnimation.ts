import { useCallback, useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  const initializeObserver = useCallback(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              });
              observer.current?.unobserve(element);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        }
      );
    }
  }, []);

  const cleanupObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
  }, []);

  const setRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      initializeObserver();
      const elements = element.querySelectorAll('.course-card-animate');
      elements?.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateY(30px)';
        htmlEl.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        htmlEl.style.transitionDelay = `${index * 150}ms`;
        observer.current?.observe(el);
      });
    } else {
      cleanupObserver();
    }
  }, [initializeObserver, cleanupObserver]);

  useEffect(() => {
    return () => {
      cleanupObserver();
    };
  }, [cleanupObserver]);

  return setRef;
}; 
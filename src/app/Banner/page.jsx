'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import 'animate.css';
import styles from '../AnimatedBanner.module.css';

const AnimatedBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchCoordinates = useRef({ start: 0, end: 0 });
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Master New Skills",
      highlight: "With SkillSphere",
      description: "Learn from industry experts and build in-demand skills through high-quality video courses and hands-on projects.",
      bgImage: "/banner.png",
    },
    {
      id: 2,
      title: "Learn Anytime,",
      highlight: "Anywhere",
      description: "Access 1000+ courses in Web Development, UI/UX Design, Digital Marketing, Data Science, AI and more.",
      bgImage: "/banner.png",
    },
    {
      id: 3,
      title: "Transform Your",
      highlight: "Career Today",
      description: "Join thousands of students who have upgraded their skills and landed their dream jobs with SkillSphere.",
      bgImage: "/banner.png",
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  const handlePrevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const goToSlide = (index) => setCurrentIndex(index);

  const handleTouchStart = (e) => touchCoordinates.current.start = e.changedTouches[0].screenX;
  const handleTouchEnd = (e) => {
    touchCoordinates.current.end = e.changedTouches[0].screenX;
    const diff = touchCoordinates.current.start - touchCoordinates.current.end;
    if (Math.abs(diff) > 50) diff > 0 ? handleNextSlide() : handlePrevSlide();
  };

  return (
    <div className={styles.container}>
      
      {slides.map((slide, index) => (
        <div
          key={`bg-${slide.id}`}
          className={`${styles.background} transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.bgImage}
            alt={`Banner background ${slide.id}`}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
        </div>
      ))}
      
      <div className={styles.overlay} />

      <div className={styles.contentWrapper}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slideContent} ${index === currentIndex ? styles.active : ''}`}
          >
            <div className={styles.content}>
              <h1 className={`${styles.title} animate__animated animate__fadeInDown`}>
                {slide.title} <br />
                <span className={styles.highlight}>{slide.highlight}</span>
              </h1>

              <p className={`${styles.description} animate__animated animate__fadeInUp animate__delay-1s`}>
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.arrowButton} ${styles.arrowLeft}`} onClick={handlePrevSlide}>❮</button>
      <button className={`${styles.arrowButton} ${styles.arrowRight}`} onClick={handleNextSlide}>❯</button>

      <div className={styles.navigation}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.navDot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBanner;
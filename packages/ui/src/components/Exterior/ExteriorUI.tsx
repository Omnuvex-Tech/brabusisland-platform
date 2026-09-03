'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from '../../styles/Exterior/exterior.module.css';

interface ExteriorImage {
  src: string;
  alt: string;
}

interface ExteriorUIProps {
  titleBold: string;
  titleRegular: string;
  description: string;
  caption: string;
  images: ExteriorImage[];
  arrowLeftSrc: string;
  arrowRightSrc: string;
}

const TRANSITION_MS = 500;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export function ExteriorUI({
  titleBold,
  titleRegular,
  description,
  caption,
  images,
  arrowLeftSrc,
  arrowRightSrc,
}: ExteriorUIProps) {
  const count = images.length;

  if (count === 0) {
    return null;
  }

  const extended: ExteriorImage[] = [
    images[count - 1]!,
    ...images,
    images[0]!,
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isJumping = useRef(false);

  const [index, setIndex] = useState(1); 
  const [withTransition, setWithTransition] = useState(true);
  const [offsets, setOffsets] = useState<number[]>([]);

  const measureOffsets = useCallback(() => {
    const next = slideRefs.current.map((el) => el?.offsetLeft ?? 0);
    setOffsets(next);
  }, []);

  useLayoutEffect(() => {
    measureOffsets();
    window.addEventListener('resize', measureOffsets);
    return () => window.removeEventListener('resize', measureOffsets);
  }, [measureOffsets]);

  const goNext = () => {
    if (isJumping.current) return;
    setWithTransition(true);
    setIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (isJumping.current) return;
    setWithTransition(true);
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (index === extended.length - 1) {
      isJumping.current = true;
      setWithTransition(false);
      setIndex(1);
    } else if (index === 0) {
      isJumping.current = true;
      setWithTransition(false);
      setIndex(count);
    }
  };

  useEffect(() => {
    if (!withTransition && isJumping.current) {
      const raf = requestAnimationFrame(() => {
        isJumping.current = false;
        setWithTransition(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  const offsetX = offsets[index] ?? 0;
  const descriptionWords = description.split(' ');

  return (
    <section id="exterior" className={styles.section}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <span className={styles.titleBold}>{titleBold}</span>{' '}
          <span className={styles.titleRegular}>{titleRegular}</span>
        </motion.h2>

        <motion.p 
          className={styles.description}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.03, delayChildren: 0.2 }}
        >
          {descriptionWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>

      <motion.div 
        className={styles.sliderOuter}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.3 }}
      >
        <div className={styles.sliderWrapper}>
          <div
            ref={trackRef}
            className={styles.track}
            style={{
              transform: `translateX(-${offsetX}px)`,
              transition: withTransition
                ? `transform ${TRANSITION_MS}ms ease`
                : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((image, i) => {
              const realIndex = ((i - 1) + count) % count;
              const isActive = i === index;
              return (
                <div
                  key={`${image.src}-${i}`}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className={styles.slide}
                >
                  <div className={styles.slideFrame}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.slideImage}
                      sizes="(max-width: 1024px) 100vw, 1140px"
                      priority={realIndex === 0}
                    />
                    <div
                      className={`${styles.shadowOverlay} ${
                        isActive ? styles.shadowOverlayHidden : ''
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.arrowsBar}>
          <button
            type="button"
            className={styles.arrow}
            onClick={goPrev}
            aria-label="Previous"
          >
            <Image src={arrowLeftSrc} alt="" fill className={styles.arrowIcon} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={goNext}
            aria-label="Next"
          >
            <Image src={arrowRightSrc} alt="" fill className={styles.arrowIcon} />
          </button>
        </div>
      </motion.div>

      <motion.p 
        className={styles.caption}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.4 }}
      >
        {caption}
      </motion.p>
    </section>
  );
}
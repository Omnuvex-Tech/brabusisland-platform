'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Interior/interior.module.css';

interface InteriorImage {
  src: string;
  alt: string;
}

interface InteriorUIProps {
  titleBold: string;
  titleRegular: string;
  description: string;
  images: InteriorImage[];
  arrowLeftSrc: string;
  arrowRightSrc: string;
}

const TRANSITION_MS = 500;

export function InteriorUI({
  titleBold,
  titleRegular,
  description,
  images,
  arrowLeftSrc,
  arrowRightSrc,
}: InteriorUIProps) {
  const count = images.length;

  if (count === 0) {
    return null;
  }

  const extended: InteriorImage[] = [
    images[count - 1]!,
    ...images,
    images[0]!,
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isJumping = useRef(false);

  const [index, setIndex] = useState(1); // extended massivində indeks
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

  return (
    <section id="exterior" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleBold}>{titleBold}</span>{' '}
          <span className={styles.titleRegular}>{titleRegular}</span>
        </h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.sliderOuter}>
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
      </div>

    </section>
  );
}
'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from '../../styles/Cta/cta.module.css';

interface CtaUIProps {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  href: string;
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1.0],
      delay: 0.3
    }
  }
};

export function CtaUI({ imageSrc, imageAlt, buttonText, href }: CtaUIProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) {
      return;
    }
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash !== href) {
      window.history.pushState(null, '', href);
    }
  };

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.imageFrame}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={imageVariants}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={buttonVariants}
        style={{ display: 'contents' }}
      >
        <a href={href} className={styles.button} onClick={handleClick}>
          {buttonText}
        </a>
      </motion.div>
    </section>
  );
}
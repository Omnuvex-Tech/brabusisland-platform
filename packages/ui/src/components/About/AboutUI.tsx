'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from '../../styles/About/about.module.css';

interface AboutUIProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

const imageFadeIn: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.1, 
      ease: [0.25, 0.1, 0.25, 1.0],
      delay: 0.2
    }
  }
};

export function AboutUI({ title, description, imageSrc, imageAlt }: AboutUIProps) {
  return (
    <section id="about" className={styles.section}>
      <motion.div 
        className={styles.textCol}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h2 variants={fadeInUp} className={styles.title}>
          {title}
        </motion.h2>
        <motion.p variants={fadeInUp} className={styles.description}>
          {description}
        </motion.p>
      </motion.div>

      <motion.div 
        className={styles.imageCol}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={imageFadeIn}
      >
        <div className={styles.imageFrame}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 595px"
          />
        </div>
      </motion.div>
    </section>
  );
}
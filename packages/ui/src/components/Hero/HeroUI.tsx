'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from '../../styles/Hero/hero.module.css';

interface HeroUIProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
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

export function HeroUI({ title, subtitle, buttonLabel, buttonHref }: HeroUIProps) {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.heroImage}
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src="/images/heroimg.jpg"
          alt="Brabus Island Baku"
          fill
          priority
          className={styles.heroImage}
        />
      </motion.div>

      <div className={styles.overlay} />

      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h1 variants={fadeInUp} className={styles.title}>
          {title}
        </motion.h1>

        <motion.p variants={fadeInUp} className={styles.subtitle}>
          {subtitle}
        </motion.p>

        <motion.a
          variants={fadeInUp}
          href={buttonHref}
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonLabel}
        </motion.a>
      </motion.div>
    </section>
  );
}
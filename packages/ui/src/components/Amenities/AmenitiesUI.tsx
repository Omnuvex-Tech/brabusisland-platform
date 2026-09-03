'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from '../../styles/Amenities/amenities.module.css';

export interface AmenityItem {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface AmenitiesUIProps {
  items: AmenityItem[];
}

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

export function AmenitiesUI({ items }: AmenitiesUIProps) {
  return (
    <section className={styles.section} style={{ overflow: 'hidden' }}>
      {items.map((item, index) => {
        const isReversed = index % 2 === 1;

        return (
          <div
            key={item.title}
            className={`${styles.row} ${isReversed ? styles.rowReversed : ''}`}
          >
            <motion.div 
              className={styles.imageBlock}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={imageVariants}
              style={{ overflow: 'hidden', position: 'relative' }}
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 695px"
              />
            </motion.div>

            <motion.div 
              className={isReversed ? styles.textBlockLeft : styles.textBlockRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={textContainerVariants}
            >
              <motion.span variants={textItemVariants} className={styles.label}>
                {item.label}
              </motion.span>
              <motion.h3 variants={textItemVariants} className={styles.title}>
                {item.title}
              </motion.h3>
              <motion.p variants={textItemVariants} className={styles.description}>
                {item.description}
              </motion.p>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
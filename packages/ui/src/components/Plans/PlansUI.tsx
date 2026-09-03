'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from '../../styles/Plans/plans.module.css';

export interface PlanMetaRow {
  label: string;
  value: string;
  icon: number;
}

export interface PlanUnit {
  id: string;
  tabLabel: string;
  imageSrc: string;
  imageAlt: string;
  meta: PlanMetaRow[];
  rooms: string[];
}

interface PlansUIProps {
  title: string;
  buttonLabel: string;
  buttonHref: string;
  units: PlanUnit[];
  iconBasePath: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const tabContentVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export function PlansUI({ title, buttonLabel, buttonHref, units, iconBasePath }: PlansUIProps) {
  const [activeId, setActiveId] = useState(units[0]?.id ?? '');
  const active = units.find((u) => u.id === activeId) ?? units[0];

  if (!active) {
    return null;
  }

  return (
    <section id="plans" className={styles.section} style={{ overflow: 'hidden' }}>
      {/* Header animasiyası */}
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className={styles.heading}>{title}</h2>
        <a href={buttonHref} className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
          {buttonLabel}
        </a>
      </motion.div>

      <motion.div
        className={styles.tabsRow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ delay: 0.15 }}
      >
        <div className={styles.tabsInner}>
          {units.map((unit) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => setActiveId(unit.id)}
              className={`${styles.tab} ${unit.id === active.id ? styles.tabActive : ''}`}
            >
              {unit.tabLabel.split('\n').map((line, i) => (
                <span key={i} className={styles.tabLine}>
                  {line}
                </span>
              ))}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabContentVariants}
            style={{ display: 'contents' }}
          >
            <div className={styles.infoPanel}>
              <div className={styles.metaList}>
                {active.meta.map((row, i) => {
                  const isLast = i === active.meta.length - 1;
                  return (
                    <div key={i} className={styles.metaRow}>
                      <Image
                        src={`${iconBasePath}${row.icon}.svg`}
                        alt=""
                        width={28}
                        height={28}
                        className={styles.metaIcon}
                        aria-hidden="true"
                      />
                      <div className={styles.metaText}>
                        <span className={styles.metaLabel}>{row.label}</span>
                        <span className={styles.metaValue}>{row.value}</span>
                      </div>

                      {isLast && (
                        <ul className={styles.roomsList}>
                          {active.rooms.map((room, j) =>
                            room.trim().endsWith(':') ? (
                              <li key={j} className={styles.roomHeading}>
                                {room}
                              </li>
                            ) : (
                              <li key={j} className={styles.roomItem}>
                                {room}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.imageWrap}>
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 690px"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
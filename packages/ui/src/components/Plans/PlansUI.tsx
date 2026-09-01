'use client';

import { useState } from 'react';
import Image from 'next/image';
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

export function PlansUI({ title, buttonLabel, buttonHref, units, iconBasePath }: PlansUIProps) {
  const [activeId, setActiveId] = useState(units[0]?.id ?? '');
  const active = units.find((u) => u.id === activeId) ?? units[0];

  if (!active) {
    return null;
  }

  return (
    <section id="plans" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>
        <a href={buttonHref} className={styles.ctaButton}>
          {buttonLabel}
        </a>
      </div>

      <div className={styles.tabsRow}>
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
      </div>

      <div className={styles.content}>
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
      </div>
    </section>
  );
}
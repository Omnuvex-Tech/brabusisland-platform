'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from '../../styles/Contact/contact.module.css';

export interface ContactInfoItem {
  icon: string;
  value: string;
  href?: string;
}

export interface CountryCode {
  iso: string;
  label: string;
  dialCode: string;
}

interface ContactUIProps {
  heading: string;
  infoItems: ContactInfoItem[];
  formTitle: string;
  namePlaceholder: string;
  surnamePlaceholder: string;
  messagePlaceholder: string;
  numberPlaceholder: string;
  countryCodes: CountryCode[];
  defaultCountryIso?: string;
  arrowSrc: string;
  sendLabel: string;
  consentText: string;
  mapImageSrc: string;
  mapImageAlt: string;
  mapButtonLabel: string;
  mapButtonHref: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const infoListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const infoItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export function ContactUI({
  heading,
  infoItems,
  formTitle,
  namePlaceholder,
  surnamePlaceholder,
  messagePlaceholder,
  numberPlaceholder,
  countryCodes,
  defaultCountryIso = 'AZE',
  arrowSrc,
  sendLabel,
  consentText,
  mapImageSrc,
  mapImageAlt,
  mapButtonLabel,
  mapButtonHref,
}: ContactUIProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedIso, setSelectedIso] = useState(defaultCountryIso);
  const countryRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    countryCodes.find((c) => c.iso === selectedIso) ?? countryCodes[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className={styles.section} style={{ overflow: 'hidden' }}>
      <div className={styles.topRow}>
        <motion.div 
          className={styles.infoCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.heading}>{heading}</h2>

          <motion.div className={styles.infoList} variants={infoListVariants}>
            {infoItems.map((item, i) => {
              const content = (
                <>
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className={styles.infoIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.infoDivider} />
                  <span className={styles.infoText}>{item.value}</span>
                </>
              );

              return item.href ? (
                <motion.a 
                  key={i} 
                  href={item.href} 
                  className={styles.infoRow}
                  variants={infoItemVariants}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div 
                  key={i} 
                  className={styles.infoRow}
                  variants={infoItemVariants}
                >
                  {content}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.formCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>{formTitle}</h3>

            <div className={styles.formField}>
              <input
                type="text"
                name="name"
                required
                placeholder={namePlaceholder}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="text"
                name="surname"
                required
                placeholder={surnamePlaceholder}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="text"
                name="message"
                required
                placeholder={messagePlaceholder}
                className={styles.formInput}
              />
            </div>

            <div className={styles.phoneAndSend}>
              <div className={styles.phoneRow} ref={countryRef}>
                <div className={styles.countrySelectWrap}>
                  <button
                    type="button"
                    className={styles.countrySelect}
                    onClick={() => setIsCountryOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={isCountryOpen}
                  >
                    <span className={styles.countryCode}>
                      {selectedCountry?.dialCode}
                    </span>
                    <Image
                      src={arrowSrc}
                      alt=""
                      width={12}
                      height={12}
                      className={`${styles.countryArrow} ${isCountryOpen ? styles.countryArrowOpen : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isCountryOpen && (
                    <ul className={styles.countryPanel} role="listbox">
                      {countryCodes.map((c) => (
                        <li key={c.iso} role="option" aria-selected={c.iso === selectedIso}>
                          <button
                            type="button"
                            className={`${styles.countryOption} ${
                              c.iso === selectedIso ? styles.countryOptionActive : ''
                            }`}
                            onClick={() => {
                              setSelectedIso(c.iso);
                              setIsCountryOpen(false);
                            }}
                          >
                            <span className={styles.countryOptionLabel}>{c.iso}</span>
                            <span className={styles.countryOptionCode}>{c.dialCode}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className={styles.phoneDivider} />
                <input
                  type="tel"
                  name="number"
                  required
                  placeholder={numberPlaceholder}
                  className={styles.formInput}
                />
              </div>

              <button type="submit" className={styles.sendButton}>
                {sendLabel}
              </button>
            </div>

            <p className={styles.consentText}>{consentText}</p>
          </form>
        </motion.div>
      </div>

      <motion.div 
        className={styles.mapWrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <Image
          src={mapImageSrc}
          alt={mapImageAlt}
          fill
          className={styles.mapImage}
          sizes="100vw"
        />
        <a href={mapButtonHref} className={styles.mapButton}>
          {mapButtonLabel}
        </a>
      </motion.div>
    </section>
  );
}
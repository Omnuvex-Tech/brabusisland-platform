'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/LanguageSwitcher/languageSwitcher.module.css';

const flagSrc = (code: string) => `/images/${code}.svg`;

export interface LanguageSwitcherProps {
  locales: string[];
  activeLocale: string;
  onLocaleChange: (locale: string) => void;
}

const LanguageSwitcher = ({ locales, activeLocale, onLocaleChange }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const otherLocales = locales.filter((code) => code !== activeLocale);

  const handleSelect = (code: string) => {
    onLocaleChange(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={rootRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.code}>{activeLocale.toUpperCase()}</span>
        <Image
          src={flagSrc(activeLocale)}
          alt=""
          width={20}
          height={20}
          className={styles.flag}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul className={styles.panel} role="listbox">
          {otherLocales.map((code) => (
            <li key={code} role="option" aria-selected={false}>
              <button type="button" className={styles.option} onClick={() => handleSelect(code)}>
                <span className={styles.code}>{code.toUpperCase()}</span>
                <Image
                  src={flagSrc(code)}
                  alt=""
                  width={20}
                  height={20}
                  className={styles.flag}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { LanguageSwitcher };
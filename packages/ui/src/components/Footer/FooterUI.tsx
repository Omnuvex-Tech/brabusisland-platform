'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { LanguageSwitcher } from '../LanguageSwitcher/language-switcher';
import styles from '../../styles/Footer/footer.module.css';

interface FooterNavLink {
  label: string;
  href: string;
  target?: string;
}

interface FooterUIProps {
  logoSrc: string;
  logoAlt: string;
  navLinks: FooterNavLink[];
  catalogLabel: string;
  catalogHref: string;
  locales: string[];
  activeLocale: string;
  onLocaleChange: (locale: string) => void;
  privacyLabel: string;
  privacyHref: string;
  termsLabel: string;
  termsHref: string;
  copyrightText: string;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export function FooterUI({
  logoSrc,
  logoAlt,
  navLinks,
  catalogLabel,
  catalogHref,
  locales,
  activeLocale,
  onLocaleChange,
  privacyLabel,
  privacyHref,
  termsLabel,
  termsHref,
  copyrightText,
}: FooterUIProps) {
  return (
    <footer className={styles.footer} style={{ overflow: 'hidden' }}>
      <div className={styles.top}>
        <motion.div
          className={styles.logoWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={220}
            height={64}
            className={styles.logo}
          />
        </motion.div>

        {/* Xətt Bloku */}
        <motion.div
          className={styles.divider}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        />
        <div className={styles.navRow}>
          <motion.ul
            className={styles.navList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={navContainerVariants}
          >
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={navItemVariants}>
                {link.target === '_blank' ? (
                  <a
                    href={link.href}
                    className={styles.navLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className={styles.rightControls}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <a href={catalogHref} className={styles.catalogButton} download rel="noopener noreferrer">
              {catalogLabel}
            </a>
            <LanguageSwitcher
              locales={locales}
              activeLocale={activeLocale}
              onLocaleChange={onLocaleChange}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className={styles.bottom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
        <div className={styles.legalLinks}>
          <Link href={privacyHref} className={styles.legalLink}>
            {privacyLabel}
          </Link>
          <Link href={termsHref} className={styles.legalLink}>
            {termsLabel}
          </Link>
        </div>
        <span className={styles.copyright}>{copyrightText}</span>
      </motion.div>
    </footer>
  );
}
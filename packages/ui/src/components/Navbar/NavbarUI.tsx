'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Navbar/navbar.module.css';

export interface NavLinkItem {
  label: string;
  href: string;
  target?: string;
}

interface NavbarUIProps {
  navLinks: NavLinkItem[];
  catalogLabel: string;
  catalogHref: string;
  languageSwitcher: ReactNode;
  mobileLanguageSwitcher: ReactNode;
}

export function NavbarUI({
  navLinks,
  catalogLabel,
  catalogHref,
  languageSwitcher,
  mobileLanguageSwitcher,
}: NavbarUIProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/images/logo.svg"
            alt="Brabus Island Baku"
            width={140}
            height={40}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  target={link.target}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href={catalogHref}
            className={styles.catalogButton}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            {catalogLabel}
          </a>
          <span className={styles.languageSwitcherWrap}>{languageSwitcher}</span>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="Menyunu aç"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <Image src="/images/Lang.svg" alt="" width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.mobileHeader}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Image
              src="/images/logo.svg"
              alt="Brabus Island Baku"
              width={140}
              height={40}
              className={styles.logoImage}
            />
          </Link>

          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Menyunu bağla"
            onClick={closeMenu}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav className={styles.mobileNavArea}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  target={link.target}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={catalogHref}
            className={styles.mobileCatalogButton}
            download
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            {catalogLabel}
          </a>
        </nav>

        <div className={styles.mobileLangRow}>{mobileLanguageSwitcher}</div>
      </div>
    </header>
  );
}
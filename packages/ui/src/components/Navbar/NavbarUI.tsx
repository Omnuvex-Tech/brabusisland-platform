'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Navbar/navbar.module.css';

export interface NavLinkItem {
  label: string;
  href: string;
}

interface NavbarUIProps {
  navLinks: NavLinkItem[];
  catalogLabel: string;
  catalogHref: string;
  languageSwitcher: ReactNode;
}

export function NavbarUI({ navLinks, catalogLabel, catalogHref, languageSwitcher }: NavbarUIProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
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
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={catalogHref} className={styles.catalogButton}>
            {catalogLabel}
          </a>
          <span className={styles.languageSwitcherWrap}>{languageSwitcher}</span>
        </div>
      </div>
    </header>
  );
}
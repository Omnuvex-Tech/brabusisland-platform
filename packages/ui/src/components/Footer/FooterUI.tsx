import Image from 'next/image';
import Link from 'next/link';
import { LanguageSwitcher } from '../LanguageSwitcher/language-switcher';
import styles from '../../styles/Footer/footer.module.css';

interface FooterNavLink {
  label: string;
  href: string;
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
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logoWrap}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={220}
            height={64}
            className={styles.logo}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.navRow}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.rightControls}>
            <Link href={catalogHref} className={styles.catalogButton}>
              {catalogLabel}
            </Link>
            <LanguageSwitcher
              locales={locales}
              activeLocale={activeLocale}
              onLocaleChange={onLocaleChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.legalLinks}>
          <Link href={privacyHref} className={styles.legalLink}>
            {privacyLabel}
          </Link>
          <Link href={termsHref} className={styles.legalLink}>
            {termsLabel}
          </Link>
        </div>
        <span className={styles.copyright}>{copyrightText}</span>
      </div>
    </footer>
  );
}
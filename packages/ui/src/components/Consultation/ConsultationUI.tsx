'use client';

import Image from 'next/image';
import styles from '../../styles/Consultation/consultation.module.css';

interface ConsultationUIProps {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  href: string;
}

export function ConsultationUI({ imageSrc, imageAlt, buttonText, href }: ConsultationUIProps) {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) {
      return;
    }
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash !== href) {
      window.history.pushState(null, '', href);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.imageFrame}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="100vw"
        />
      </div>

      <a href={href} className={styles.button} onClick={handleClick}>
        {buttonText}
      </a>
    </section>
  );
}
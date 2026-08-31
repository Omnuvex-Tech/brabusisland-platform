import Image from 'next/image';
import styles from '../../styles/Hero/hero.module.css';

interface HeroUIProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
}

export function HeroUI({ title, subtitle, buttonLabel, buttonHref }: HeroUIProps) {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/heroimg.jpg"
        alt="Brabus Island Baku"
        fill
        priority
        className={styles.heroImage}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <a href={buttonHref} className={styles.button}>
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
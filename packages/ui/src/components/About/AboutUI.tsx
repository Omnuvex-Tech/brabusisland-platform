import Image from 'next/image';
import styles from '../../styles/About/about.module.css';

interface AboutUIProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function AboutUI({ title, description, imageSrc, imageAlt }: AboutUIProps) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.textCol}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.imageCol}>
        <div className={styles.imageFrame}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 595px"
          />
        </div>
      </div>
    </section>
  );
}
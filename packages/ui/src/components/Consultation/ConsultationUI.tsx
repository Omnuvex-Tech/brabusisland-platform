import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Consultation/consultation.module.css';

interface ConsultationUIProps {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  href: string;
}

export function ConsultationUI({ imageSrc, imageAlt, buttonText, href }: ConsultationUIProps) {
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

      <Link href={href} className={styles.button}>
        {buttonText}
      </Link>
    </section>
  );
}
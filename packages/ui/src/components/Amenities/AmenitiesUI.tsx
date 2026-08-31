import Image from 'next/image';
import styles from '../../styles/Amenities/amenities.module.css';

export interface AmenityItem {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface AmenitiesUIProps {
  items: AmenityItem[];
}

export function AmenitiesUI({ items }: AmenitiesUIProps) {
  return (
    <section className={styles.section}>
      {items.map((item, index) => {
        const isReversed = index % 2 === 1;

        return (
          <div
            key={item.title}
            className={`${styles.row} ${isReversed ? styles.rowReversed : ''}`}
          >
            <div className={styles.imageBlock}>
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 695px"
              />
            </div>

            <div className={isReversed ? styles.textBlockLeft : styles.textBlockRight}>
              <span className={styles.label}>{item.label}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
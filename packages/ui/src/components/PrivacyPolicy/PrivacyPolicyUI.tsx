import styles from '../../styles/PrivacyPolicy/privacypolicy.module.css';

interface PrivacyPolicyUIProps {
  title: string;
  intro: string;
  sectionHeading: string;
  sectionIntro: string;
  purposeIntro: string;
  bullets: string[];
  closing: string;
}

export function PrivacyPolicyUI({
  title,
  intro,
  sectionHeading,
  sectionIntro,
  purposeIntro,
  bullets,
  closing,
}: PrivacyPolicyUIProps) {
  return (
    <main className={styles.page}>
      <div className={styles.titleBand}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.body}>
        <p className={styles.intro}>{intro}</p>

        <h2 className={styles.sectionHeading}>{sectionHeading}</h2>
        <p className={styles.sectionIntro}>{sectionIntro}</p>
        <p className={styles.purposeIntro}>{purposeIntro}</p>

        <ul className={styles.bulletList}>
          {bullets.map((bullet, i) => (
            <li key={i} className={styles.bulletItem}>
              {bullet}
            </li>
          ))}
        </ul>

        <p className={styles.closing}>{closing}</p>
      </div>
    </main>
  );
}
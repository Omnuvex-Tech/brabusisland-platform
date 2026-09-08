import styles from '../../styles/Terms/terms.module.css';

interface TermsItem {
  label: string;
  text: string;
}

interface TermsSection {
  number: number;
  heading: string;
  paragraphs?: string[];
  items?: TermsItem[];
}

interface TermsUIProps {
  title: string;
  sections: TermsSection[];
}

export function TermsUI({ title, sections }: TermsUIProps) {
  return (
    <main className={styles.page}>
      <div className={styles.titleBand}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.body}>
        {sections.map((section) => (
          <section key={section.number} className={styles.section}>
            <h2 className={styles.sectionHeading}>
              {section.number}. {section.heading}
            </h2>

            {section.paragraphs?.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            {section.items && (
              <ul className={styles.itemList}>
                {section.items.map((item, i) => (
                  <li key={i} className={styles.item}>
                    <span className={styles.itemLabel}>{item.label}:</span>{' '}
                    <span className={styles.itemText}>{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
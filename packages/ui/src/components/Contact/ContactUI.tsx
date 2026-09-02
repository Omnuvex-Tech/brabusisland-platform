'use client';

import Image from 'next/image';
import styles from '../../styles/Contact/contact.module.css';

export interface ContactInfoItem {
  icon: string;
  value: string;
  href?: string;
}

interface ContactUIProps {
  heading: string;
  infoItems: ContactInfoItem[];

  formTitle: string;
  namePlaceholder: string;
  surnamePlaceholder: string;
  messagePlaceholder: string;
  numberPlaceholder: string;
  countryFlagSrc: string;
  countryCode: string;
  arrowSrc: string;
  sendLabel: string;
  consentText: string;

  mapImageSrc: string;
  mapImageAlt: string;
  mapButtonLabel: string;
  mapButtonHref: string;
}

export function ContactUI({
  heading,
  infoItems,
  formTitle,
  namePlaceholder,
  surnamePlaceholder,
  messagePlaceholder,
  numberPlaceholder,
  countryFlagSrc,
  countryCode,
  arrowSrc,
  sendLabel,
  consentText,
  mapImageSrc,
  mapImageAlt,
  mapButtonLabel,
  mapButtonHref,
}: ContactUIProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.topRow}>
        <div className={styles.infoCol}>
          <h2 className={styles.heading}>{heading}</h2>

          <div className={styles.infoList}>
            {infoItems.map((item, i) => {
              const content = (
                <>
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className={styles.infoIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.infoDivider} />
                  <span className={styles.infoText}>{item.value}</span>
                </>
              );

              return item.href ? (
                <a key={i} href={item.href} className={styles.infoRow}>
                  {content}
                </a>
              ) : (
                <div key={i} className={styles.infoRow}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.formCol}>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>{formTitle}</h3>

            <div className={styles.formField}>
              <input
                type="text"
                name="name"
                required
                placeholder={namePlaceholder}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="text"
                name="surname"
                required
                placeholder={surnamePlaceholder}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formField}>
              <input
                type="text"
                name="message"
                required
                placeholder={messagePlaceholder}
                className={styles.formInput}
              />
            </div>

            <div className={styles.phoneAndSend}>
              <div className={styles.phoneRow}>
                <button type="button" className={styles.countrySelect}>
                  <Image
                    src={countryFlagSrc}
                    alt=""
                    width={20}
                    height={20}
                    className={styles.countryFlag}
                    aria-hidden="true"
                  />
                  <span className={styles.countryCode}>{countryCode}</span>
                  <Image
                    src={arrowSrc}
                    alt=""
                    width={12}
                    height={12}
                    className={styles.countryArrow}
                    aria-hidden="true"
                  />
                </button>
                <span className={styles.phoneDivider} />
                <input
                  type="tel"
                  name="number"
                  required
                  placeholder={numberPlaceholder}
                  className={styles.formInput}
                />
              </div>

              <button type="submit" className={styles.sendButton}>
                {sendLabel}
              </button>
            </div>

            <p className={styles.consentText}>{consentText}</p>
          </form>
        </div>
      </div>

      <div className={styles.mapWrap}>
        <Image
          src={mapImageSrc}
          alt={mapImageAlt}
          fill
          className={styles.mapImage}
          sizes="100vw"
        />
        <a href={mapButtonHref} className={styles.mapButton}>
          {mapButtonLabel}
        </a>
      </div>
    </section>
  );
}
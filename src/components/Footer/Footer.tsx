import styles from './footer.module.scss';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p className={styles.footer_info}>{currentYear}</p>
      </div>
    </footer>
  );
};

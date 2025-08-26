import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h2 className='accent_bold'>Страница не найдена</h2>
    </div>
  );
}

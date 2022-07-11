import styles from './Footer.module.css'

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      &copy; leboncoin & gregy - {year}
    </footer>
  )
}
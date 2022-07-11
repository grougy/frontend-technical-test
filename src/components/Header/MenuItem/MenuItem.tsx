import Link from "next/link"
import styles from './Menuitem.module.css'

export const MenuItem = ({ target, children }) => {
  return (
    <Link href={target} className={styles.link}>
      <a>
        {children}
      </a>
    </Link>
  )
}
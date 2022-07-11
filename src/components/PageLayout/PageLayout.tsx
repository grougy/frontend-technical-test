import { Header } from "../Header"
import { ReactNode } from 'react'
import styles from './PageLayout.module.css'
import { Footer } from '../Footer'

interface PageLayoutProps {
  children?: ReactNode,
  scrollable?: boolean,
}

export const PageLayout = ({ children, scrollable = false }: PageLayoutProps) => {
  return (
    <div className={`${styles.container} ${scrollable && styles['container-scrollable']}`}>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
      {!scrollable && <Footer />}
    </div>
  )
}
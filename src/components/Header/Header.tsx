import styles from './Header.module.css'
import Logo from '../../assets/lbc-logo.webp'
import Image from 'next/image'
import Link from 'next/link'
import { MenuItem } from './MenuItem'

export const Header = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <Image src={Logo} alt="leboncoin logo" width={128} height={40}></Image>
        </a>
      </Link>
      <nav className={styles.menu}>
        <MenuItem target="/dummy1">Page1</MenuItem>
        <MenuItem target="/dummy2">Page2</MenuItem>
        <MenuItem target="/messaging">Conversations</MenuItem>
      </nav>
    </div>
  )
}
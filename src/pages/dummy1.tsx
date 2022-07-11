import type { FC } from 'react'
import Head from 'next/head'
import { PageLayout } from '../components/PageLayout'
import styles from '../styles/Dummy.module.css'

const DummyPage: FC = () => {
  const year = new Date().getFullYear()

  return (
    <PageLayout>
      <Head>
        <title>A page - leboncoin</title>
        <meta name="description" content="Messages"></meta>
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Hey !
        </h1>

        <p className={styles.description}>
          This is just a dummy page to illustrate the behavior/persistence<br />of the new messaging feature accompanying you anywhere on leboncoin.
        </p>
        <p className={styles.description}>
          Have you noticed the new item in the menu ?
        </p>

      </main>

    </PageLayout>
  )
}

export default DummyPage
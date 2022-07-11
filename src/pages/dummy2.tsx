import type { FC } from 'react'
import Head from 'next/head'
import { PageLayout } from '../components/PageLayout'
import styles from '../styles/Dummy.module.css'

const DummyPage: FC = () => {
  const year = new Date().getFullYear()

  return (
    <PageLayout>
      <Head>
        <title>Another page - leboncoin</title>
        <meta name="description" content="Messages"></meta>
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Ho !
        </h1>

        <p className={styles.description}>
          This is another dummy page to illustrate the behavior<br />of the new messaging feature accompanying you anywhere on leboncoin.
        </p>
        <p className={styles.description}>
          Don&apos;t you noticed the new item in the header menu ?
        </p>

      </main>

    </PageLayout>
  )
}

export default DummyPage
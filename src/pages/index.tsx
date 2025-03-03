import type { FC } from 'react'
import Head from 'next/head'
import { PageLayout } from '../components/PageLayout'
import styles from '../styles/Dummy.module.css'

const DummyPage: FC = () => {
  const year = new Date().getFullYear()

  return (
    <PageLayout>
      <Head>
        <title>Home - leboncoin</title>
        <meta name="description" content="Messages"></meta>
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Here it is !
        </h1>

        <p className={styles.description}>
          This is my response to the leboncoin hiring test at<br />
          <a title="leboncoin hiring frontend test" href="https://github.com/leboncoin/frontend-technical-test" target="_blank" rel="noopener noreferrer">https://github.com/leboncoin/frontend-technical-test</a>
          <br /><br />

          Please see the{' '}
          <code className={styles.code}>README.md</code> for detailled explanations.
        </p>

      </main>

    </PageLayout>
  )
}

export default DummyPage
import type { FC } from 'react'
import { PageLayout } from '../../components/PageLayout'
import Head from 'next/head'
import { Conversations } from '../../components/Messaging/Conversations'
import Link from 'next/link'

const Messaging: FC = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Conversations - leboncoin</title>
        <meta name="description" content="Messages"></meta>
      </Head>
      <h1>Conversations</h1>
      <p>
        <Link href="/messaging/conversation/new">
          <a>➕ Create a new conversation</a>
        </Link>
      </p>
      <Conversations />
    </PageLayout>
  )
}

export default Messaging
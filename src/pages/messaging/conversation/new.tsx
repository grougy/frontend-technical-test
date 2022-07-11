import type { FC } from 'react'
import { PageLayout } from '../../../components/PageLayout'
import Head from 'next/head'
import { NewConversation } from '../../../components/Messaging/NewConversation'

const NewConversationPage: FC = () => {
  return (
    <PageLayout>
      <Head>
        <title>New conversation - leboncoin</title>
        <meta name="description" content="Conversation"></meta>
      </Head>
      <h1>New conversation</h1>
      <p>Choose the desired contact to start a new conversation with:</p>
      <NewConversation />
    </PageLayout>
  )
}

export default NewConversationPage
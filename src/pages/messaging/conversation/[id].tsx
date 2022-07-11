import type { FC } from 'react'
import { PageLayout } from '../../../components/PageLayout'
import Head from 'next/head'
import { ConversationBlock } from '../../../components/Messaging/ConversationBlock'
import { useRouter } from 'next/router'

/**
 * Note: no static props here, we do not want to cache conversation content.
 */

const ConversationPage: FC = (props) => {
  const router = useRouter();

  const conversationId = parseInt(router.query.id as string)

  return (
    <PageLayout scrollable={true}>
      <Head>
        <title>Conversation - leboncoin</title>
        <meta name="description" content="Conversation"></meta>
      </Head>
      <ConversationBlock id={conversationId} />
    </PageLayout>
  )
}

export default ConversationPage
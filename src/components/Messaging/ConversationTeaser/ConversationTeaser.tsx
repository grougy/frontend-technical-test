import { useConversation, useConversationInfos } from "../../../features/messaging/hooks/conversations"
import { Conversation } from "../../../types/conversation"
import styles from './ConversationTeaser.module.css'

interface ConversationTeaserProps {
  id: Conversation["id"]
}

export const ConversationTeaser = ({ id }: ConversationTeaserProps) => {

  const conversationInfos = useConversationInfos(id)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}></div>
        <div className={styles.details}>
          <div className={styles.interlocutor}>{conversationInfos?.interlocutorName ?? '...'}</div>
          <div className={styles.date}>{conversationInfos?.updatedFormated}</div>
        </div>
      </div>
    </div>
  )
}
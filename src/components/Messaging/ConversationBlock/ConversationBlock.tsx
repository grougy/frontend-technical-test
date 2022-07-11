import { useConversation, useConversationInfos, useConversationsStatus } from "../../../features/messaging/hooks/conversations"
import { Conversation } from "../../../types/conversation"
import { useAppDispatch } from "../../../hooks/redux"
import fetchConversations from "../../../features/messaging/actions/fetchConversationsAction"
import fetchMessages from "../../../features/messaging/actions/fetchMessagesAction"
import fetchNewMessages from "../../../features/messaging/actions/fetchNewMessagesAction"
import { useEffect, useRef } from "react"
import { getLoggedUserId } from "../../../utils/getLoggedUserId"
import { useConversationMessages } from "../../../features/messaging/hooks/messages"
import { MessageBlock } from "../MessageBlock"
import { MessageForm } from "../MessageForm"
import styles from './ConversationBlock.module.css'

interface ConversationBlockProps {
  id: Conversation["id"]
}

export const ConversationBlock = ({ id }: ConversationBlockProps) => {

  const conversation = useConversation(id)
  const conversationInfos = useConversationInfos(id)
  const status = useConversationsStatus()

  const bottomRef = useRef(null)

  const dispatch = useAppDispatch()
  useEffect(() => {
    // @todo improve with polling or other system to keep the list up to date
    dispatch(fetchConversations(getLoggedUserId()))
  }, [dispatch])

  // Responsible to init message list
  useEffect(() => {
    if (conversation?.id) {
      dispatch(fetchMessages(conversation.id))
    }
  }, [conversation?.id, dispatch])

  // Responsible to poll for new messages
  useEffect(() => {
    if (conversation?.id) {
      let intervalId = setInterval(() => {
        dispatch(fetchNewMessages({
          conversationId: conversation.id,
          lastTs: conversation.lastReceivedMessageTimestamp + 1
        }))
      }, 2000)
      return (() => {
        clearInterval(intervalId)
      })
    }
  }, [conversation?.id, conversation?.lastReceivedMessageTimestamp, dispatch])

  const messages = useConversationMessages(conversation?.id)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages?.length])

  if (status == 'loaded' && !conversation) {
    return (
      <div>
        Oups the conversation does not exist.
      </div>
    )
  }

  return (
    <div>
      <div className={styles['header']}>
        <div className={styles.subject}>
          {conversationInfos?.interlocutorName ?? '...'} - You
        </div>
        <div className={styles.date}>
          {conversationInfos?.updatedFormated}
        </div>
      </div>
      <div className={styles['message-list']}>
        {messages.map(message =>
          <MessageBlock key={message.id} id={message.id} interlocutorName={conversationInfos?.interlocutorName} />
        )}
        {messages.length == 0 && <div>No message yet.</div>}
        <div ref={bottomRef}></div>
      </div>
      <MessageForm conversationId={conversation?.id} />
    </div>
  )
}
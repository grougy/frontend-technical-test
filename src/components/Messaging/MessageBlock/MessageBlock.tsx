import React, { useEffect, useRef } from 'react'
import { Message } from "../../../types/message"
import { useMessage } from '../../../features/messaging/hooks/messages'
import styles from './MessageBlock.module.css'
import { getLoggedUserId } from "../../../utils/getLoggedUserId"

interface MessageProps {
  id: Message["id"],
  interlocutorName: string,
}

export const MessageBlock = ({ id, interlocutorName }: MessageProps) => {

  const message = useMessage(id)
  if (!message) {
    return null
  }

  return (
    <div className={`${styles.container} ${message?.authorId == getLoggedUserId() ? styles['self-container'] : null}`}>
      <div className={`${styles.message}`}>
        {interlocutorName && message?.authorId !== getLoggedUserId() &&
          <div className={`${styles['interlocutor']}`}>
            {interlocutorName}
          </div>
        }
        <div className={`${styles['body']}`}>
          {message.body}
        </div>
      </div>
    </div >
  )
}
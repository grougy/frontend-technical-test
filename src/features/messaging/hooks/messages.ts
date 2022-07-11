import { useAppSelector } from "../../../hooks/redux"
import { Conversation } from "../../../types/conversation"
import { Message } from "../../../types/message"

export const locateMessage = (messagingState, id) => {
  for (const message of messagingState.messages.list) {
    if (message.id == id) {
      return message
    }
  }
  return null
}

export const useMessage = (id: Message["id"]) => useAppSelector(state => {
  for (const message of state.messaging.messages.list) {
    if (message.id == id) {
      return message
    }
  }
  return null
})

export const useConversationMessages = (id: Conversation["id"]) => useAppSelector(state => {
  let messages = []
  for (const message of state.messaging.messages.list) {
    if (message.conversationId == id) {
      messages.push(message)
    }
  }
  return messages
})
import { useAppSelector } from "../../../hooks/redux"
import { Conversation } from "../../../types/conversation"
import { getLoggedUserId } from "../../../utils/getLoggedUserId"

export const useConversationsStatus = () => useAppSelector(state => {
  return state.messaging.conversations.status
})

export const useConversationsList = () => useAppSelector(state => {
  return state.messaging.conversations.list
})

export const locateConversation = (messagingState, id) => {
  for (const conversation of messagingState.conversations.list) {
    if (conversation.id == id) {
      return conversation
    }
  }
  return null
}

export const useConversation = (id: Conversation["id"]) => useAppSelector(state => {
  return locateConversation(state.messaging, id)
})

export const useConversationInfos = (id: Conversation["id"]) => useAppSelector(state => {
  let infos = {
    conversation: locateConversation(state.messaging, id),
    interlocutorName: null,
    updatedFormated: null,
  }
  if (infos.conversation) {
    infos.interlocutorName = infos.conversation.recipientId == getLoggedUserId() ?
      infos.conversation?.senderNickname :
      infos.conversation?.recipientNickname
    const lastTs = infos.conversation?.lastReceivedMessageTimestamp > 0 ?
      infos.conversation.lastReceivedMessageTimestamp :
      infos.conversation?.lastMessageTimestamp
    if (lastTs > 0) {
      // @todo better formating respecting locales...
      const d = new Date(lastTs * 1000);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
      let m = ("0" + d.getMinutes()).substr(-2)
      let h = ("0" + d.getHours()).substr(-2)
      infos.updatedFormated = `${da}-${mo}-${ye} ${h}:${m}`
    }
  }
  return infos
})
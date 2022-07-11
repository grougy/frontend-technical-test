import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import fetchConversations from "../../../features/messaging/actions/fetchConversationsAction"
import { getLoggedUserId } from "../../../utils/getLoggedUserId"
import { useConversationsList, useConversationsStatus } from "../../../features/messaging/hooks/conversations"
import { ConversationTeaser } from "../ConversationTeaser"
import Link from "next/link"

export const Conversations = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    // @todo improve with polling or other system to keep the list up to date
    dispatch(fetchConversations(getLoggedUserId()))
  }, [dispatch])

  const conversations = useConversationsList()
  const status = useConversationsStatus()

  return (
    <div>
      {status == 'error' && <div>
        Something went wrong, please wait or retry later.
      </div>}
      {status == 'loading' && <div>
        Loading your conversations...
      </div>}
      {status == 'loaded' && <div>
        {conversations.map(conversation =>
          <Link key={conversation.id} href={'/messaging/conversation/' + conversation.id}>
            <a>
              <ConversationTeaser id={conversation.id} />
            </a>
          </Link>
        )}
      </div>}
    </div>
  )
}
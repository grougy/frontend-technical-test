import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import fetchUsers from "../../../features/messaging/actions/fetchUsersAction"
import { getLoggedUserId } from "../../../utils/getLoggedUserId"
import { useUsersList, useUsersStatus } from "../../../features/messaging/hooks/users"
import { Contact } from "../Contact"
import postConversation from "../../../features/messaging/actions/postConversationAction"

export const NewConversation = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    // @todo improve with polling or other system to keep the list up to date
    dispatch(fetchUsers())
  }, [dispatch])

  const users = useUsersList()
  const status = useUsersStatus()

  const createConversation = (userId) => {
    // @todo Add a loading state to prevent multiple creation clicks :-)
    dispatch(postConversation({
      recipientId: userId
    }))
  }

  return (
    <div>
      {status == 'error' && <div>
        Something went wrong, please wait or retry later.
      </div>}
      {status == 'loading' && <div>
        Loading your contacts...
      </div>}
      {status == 'loaded' && <div>
        {users.map(user => {
          if (user.id === getLoggedUserId()) {
            return
          }
          return <Contact key={user.id} id={user.id} clickHandler={createConversation} />
        })}
      </div>}
    </div>
  )
}
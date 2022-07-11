import { useAppSelector } from "../../../hooks/redux"
import { User } from "../../../types/user"

export const useUsersStatus = () => useAppSelector(state => {
  return state.messaging.users.status
})

export const useUsersList = () => useAppSelector(state => {
  return state.messaging.users.list
})

export const locateUser = (messagingState, id) => {
  for (const user of messagingState.users.list) {
    if (user.id == id) {
      return user
    }
  }
  return null
}

export const useUser = (id: User["id"]) => useAppSelector(state => {
  return locateUser(state.messaging, id)
})
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Conversation } from '../../../types/conversation'
import { getLoggedUserId } from '../../../utils/getLoggedUserId'
import { locateUser } from '../hooks/users'

interface PostNewConversation {
  recipientId: Conversation['recipientId'],
}

const postConversation = createAsyncThunk(
  'messaging/postConversation',
  async ({ recipientId }: PostNewConversation, { fulfillWithValue, rejectWithValue, getState }) => {
    const state = getState()
    const recipientUser = locateUser(state.messaging, recipientId)
    const senderUser = locateUser(state.messaging, getLoggedUserId())
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/conversations/' + getLoggedUserId(), {
        // @todo compensate for a few missing elements in the API
        body: JSON.stringify({
          recipientId,
          recipientNickname: recipientUser.nickname,
          senderId: getLoggedUserId(),
          senderNickname: senderUser.nickname,
          lastMessageTimestamp: 0
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      });
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const data = await response.json();
      return fulfillWithValue(data)
    } catch (error) {
      throw rejectWithValue(error.message)
    }
  }
)

export default postConversation
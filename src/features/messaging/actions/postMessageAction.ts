import { createAsyncThunk } from '@reduxjs/toolkit'
import { Conversation } from '../../../types/conversation'
import { getLoggedUserId } from '../../../utils/getLoggedUserId'

interface PostMessage {
  conversationId: Conversation["id"],
  body: string,
}

const postMessage = createAsyncThunk(
  'messaging/postMessage',
  async ({ conversationId, body }: PostMessage, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/messages/' + conversationId, {
        // @todo compensate for a few missing elements in the API
        body: JSON.stringify({
          body,
          conversationId,
          timestamp: Math.floor(Date.now() / 1000),
          authorId: getLoggedUserId(),
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

export default postMessage
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Conversation } from '../../../types/conversation'

interface NewMessages {
  conversationId: Conversation["id"],
  lastTs: number
}

const fetchNewMessages = createAsyncThunk(
  'messaging/fetchNewMessages',
  async ({ conversationId, lastTs }: NewMessages, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/messages/' + conversationId + '/' + lastTs);
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

export default fetchNewMessages
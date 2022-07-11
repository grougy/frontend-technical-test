import { createAsyncThunk } from '@reduxjs/toolkit'

const fetchMessages = createAsyncThunk(
  'messaging/fetchMessages',
  async (conversationId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/messages/' + conversationId);
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

export default fetchMessages
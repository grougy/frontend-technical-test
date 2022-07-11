import { createAsyncThunk } from '@reduxjs/toolkit'

const fetchConversations = createAsyncThunk(
  'messaging/fetchConversations',
  async (userId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/conversations/' + userId);
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

export default fetchConversations
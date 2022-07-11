import { createAsyncThunk } from '@reduxjs/toolkit'

const fetchUsers = createAsyncThunk(
  'messaging/fetchUsers',
  async (params, { fulfillWithValue, rejectWithValue }) => {
    // @todo The api should have a userId param to get only our current user's relations, not all db users ;-)
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users')
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const data = await response.json()
      return fulfillWithValue(data)
    } catch (error) {
      throw rejectWithValue(error.message)
    }
  }
)

export default fetchUsers
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import messagingReducer from '../features/messaging/MessagingSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      messaging: messagingReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"]

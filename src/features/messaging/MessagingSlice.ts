import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import fetchUsers from './actions/fetchUsersAction'
import fetchConversations from './actions/fetchConversationsAction'
import fetchMessages from './actions/fetchMessagesAction'
import fetchNewMessages from './actions/fetchNewMessagesAction'
import postMessage from './actions/postMessageAction'
import { User } from '../../types/user'
import { Conversation } from '../../types/conversation'
import { Message } from '../../types/message'
import { locateConversation } from './hooks/conversations'
import { locateMessage } from './hooks/messages'
import postConversation from './actions/postConversationAction'
import Router from 'next/router'

export interface ListUsers extends Array<User> { }

export interface ListMessages extends Array<Message> { }

export interface ConversationExtended extends Conversation {
  lastReceivedMessageTimestamp: number
}
export interface ListConversations extends Array<ConversationExtended> { }

export interface MessagingState {
  users: {
    status: string,
    list: ListUsers,
  },
  conversations: {
    status: string,
    list: ListConversations,
  },
  messages: {
    list: ListMessages
  }
}

const initialState: MessagingState = {
  users: {
    status: null,
    list: [],
  },
  conversations: {
    status: null,
    list: [],
  },
  messages: {
    list: [],
  }
}

export const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Users
    builder.addCase(fetchUsers.pending, (state, action: PayloadAction<any>) => {
      state.users.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
      state.users.list = action.payload
      state.users.status = 'loaded'
    })
    builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
      state.users.status = 'error'
      state.users.list = []
    })

    // Conversations
    builder.addCase(fetchConversations.pending, (state, action: PayloadAction<any>) => {
      state.conversations.status = 'loading'
    })
    builder.addCase(fetchConversations.fulfilled, (state, action: PayloadAction<any>) => {
      action.payload.forEach((conversation: Conversation) => {
        const existingConversation = locateConversation(state, conversation.id)
        if (existingConversation) {
          return
        }
        const extendedConversation = {
          ...conversation,
          lastReceivedMessageTimestamp: 0,
        }
        state.conversations.list.push(extendedConversation)
      });
      state.conversations.status = 'loaded'
    })
    builder.addCase(fetchConversations.rejected, (state, action: PayloadAction<any>) => {
      state.conversations.status = 'error'
      state.conversations.list = []
    })

    // Messages
    builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<any>) => {
      action.payload.forEach((message: Message) => {
        // Track last message timestamp in the conversation
        const conversation = locateConversation(state, message.conversationId)
        conversation.lastReceivedMessageTimestamp = Math.max(conversation.lastReceivedMessageTimestamp, message.timestamp)
        // Protect against duplicate
        if (locateMessage(state, message.id)) {
          return
        }
        // Add the message
        state.messages.list.push(message)
      })
    })
    builder.addCase(fetchMessages.rejected, (state, action: PayloadAction<any>) => {
      // @todo Handle status to alert about message retrieval outage
    })

    // Messages
    // @todo Mutualize with Messages above
    builder.addCase(fetchNewMessages.fulfilled, (state, action: PayloadAction<any>) => {
      action.payload.forEach((message: Message) => {
        // Track last message timestamp in the conversation
        const conversation = locateConversation(state, message.conversationId)
        conversation.lastReceivedMessageTimestamp = Math.max(conversation.lastReceivedMessageTimestamp, message.timestamp)
        // Protect against duplicate
        if (locateMessage(state, message.id)) {
          return
        }
        // Add the message
        state.messages.list.push(message)
      })
    })
    builder.addCase(fetchNewMessages.rejected, (state, action: PayloadAction<any>) => {
      // @todo Handle status to alert about message retrieval outage
    })

    // New message
    builder.addCase(postMessage.fulfilled, (state, action: PayloadAction<any>) => {
      state.messages.list.push(action.payload)
    })

    // Conversation creation
    builder.addCase(postConversation.fulfilled, (state, action: PayloadAction<any>) => {
      state.conversations.list.push({
        ...action.payload,
        lastReceivedMessageTimestamp: 0,
      })
      Router.push('/messaging/conversation/' + action.payload.id)
    })
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = messagingSlice.actions

export default messagingSlice.reducer
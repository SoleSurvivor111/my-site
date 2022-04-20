import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from 'redux/reducers/auth';

import { api } from '../services/api'


const reducer = {
  [api.reducerPath]: api.reducer,
  auth: authReducer,
}


export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, logger),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
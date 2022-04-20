import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'

type AuthState = {
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem('token') } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {

      localStorage.setItem('token', token)
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectToken = (state: RootState) => state.auth.token;

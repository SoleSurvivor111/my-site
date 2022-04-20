// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'
import type { Post, User, Comment } from 'types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gorest.co.in/public/v2/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }}),
    endpoints: (builder) => ({
    getUsersByPage: builder.query<{users: User, pagesCount: string}, string>({
      query: (page) => `users?page=${page}`,
      transformResponse: (response: unknown, meta: any ) => {
        const pageCount = meta.response.headers.get('X-Pagination-Pages');

        return { users: response, pageCount }
      },
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    getPostsByPage: builder.query<{posts: Post[], pagesCount: string}, string>({
      query: (page) => `posts?page=${page}`,
      transformResponse: (response: unknown, meta: any ) => {
        const pageCount = meta.response.headers.get('X-Pagination-Pages');

        return { posts: response, pageCount }
      },
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    getPostsByUserId: builder.query<Post[], string>({
      query: (userId) => `posts?user_id=${userId}`,
    }),
    getCommentsByPostId: builder.query<Comment[], string>({
      query: (postId) => `comments?post_id=${postId}`,
    }),
  }),
})

export const { useGetPostByIdQuery, useGetPostsByPageQuery, useGetUsersByPageQuery, useGetUserByIdQuery, useGetCommentsByPostIdQuery, useGetPostsByUserIdQuery } = api;
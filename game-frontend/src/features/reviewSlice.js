// C:\lkh\project\reactNode\game-frontend\src\features\reviewSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createReview, updatedReview, deleteReview, getReviewById, getReviews } from '../api/gameApi'

// 리뷰 등록 Thunk
export const createReviewThunk = createAsyncThunk('reviews/createReview', async (reviewData, { rejectWithValue }) => {
   try {
      const response = await createReview(reviewData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

// 리뷰 수정
export const updateReviewThunk = createAsyncThunk('reviews/updateReview', async (data, { rejectWithValue }) => {
   try {
      const { id, reviewData } = data
      const response = await updatedReview(id, reviewData)
      return response.data.review
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 리뷰  삭제
export const deleteReviewThunk = createAsyncThunk('reviews/deleteReview', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deleteReview(id)
      return id // 삭제 성공 후 삭제된 게시물의 id만 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 특정 리뷰 가져오기
export const fetchReviewByIdThunk = createAsyncThunk('reviews/fetchReviewById', async (id, { rejectWithValue }) => {
   try {
      const response = await getReviewById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 전체 리뷰 리스트 가져오기
export const fetchReviewsThunk = createAsyncThunk('reviews/fetchReviews', async (page, { rejectWithValue }) => {
   try {
      const response = await getReviews(page)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 리스트 불러오기 실패')
   }
})

const reviewSlice = createSlice({
   name: 'reviews',
   initialState: {
      reviews: [],
      review: null,
      pagination: {
         totalPages: 0, // 총 페이지 수 초기값
         currentPage: 1, // 현재 페이지 초기값
         totalPosts: 0, // 총 게시물 수 초기값
      },
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 리뷰 등록
      builder
         .addCase(createReviewThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createReviewThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createReviewThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 리뷰 리스트 불러오기
      builder
         .addCase(fetchReviewsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.reviews = action.payload.reviews
            state.pagination = action.payload.pagination
         })
         .addCase(fetchReviewsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 특정 리뷰 불러오기
      builder
         .addCase(fetchReviewByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchReviewByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.review = action.payload.review
         })
         .addCase(fetchReviewByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 리뷰 삭제
      builder
         .addCase(deleteReviewThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteReviewThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteReviewThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 리뷰 수정
      builder
         .addCase(updateReviewThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateReviewThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updateReviewThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default reviewSlice.reducer

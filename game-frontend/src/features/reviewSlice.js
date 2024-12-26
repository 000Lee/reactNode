import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createReview, updatedReview, deleteReview, getReviewById, getReviews } from '../api/gameApi'

// 리뷰 등록 Thunk
export const createReviewThunk = createAsyncThunk('reviews/createReview', async (reviewData, { rejectWithValue }) => {
   try {
      const response = await createReview(reviewData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

/* 여기부터 */
// 게시물 수정
export const updateReview = createAsyncThunk('reviews/updateReview', async (data, { rejectWithValue }) => {
   try {
      const { userId, reviewData } = data
      const response = await updatePost(userId, reviewData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 게시물 삭제
export const deletePostThunk = createAsyncThunk('reviews/deletePost', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deletePost(id)
      return id // 삭제 성공 후 삭제된 게시물의 id만 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

// 특정 게시물 가져오기
export const fetchPostByIdThunk = createAsyncThunk('reviews/fetchPostById', async (id, { rejectWithValue }) => {
   try {
      const response = await getPostById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 전체 게시물 리스트 가져오기
export const fetchPostsThunk = createAsyncThunk('reviews/fetchPosts', async (page, { rejectWithValue }) => {
   try {
      const response = await getPosts(page)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 리스트 불러오기 실패')
   }
})

const postSlice = createSlice({
   name: 'reviews',
   initialState: {
      posts: [],
      post: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 게시물 등록
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 리스트 불러오기
      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 특정 게시물 불러오기
      builder
         .addCase(fetchPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(fetchPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 삭제
      builder
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 수정
      builder
         .addCase(updatePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updatePostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updatePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, checkAuthStatus } from '../api/gameApi'

// 회원가입 thunk
export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

/* rejectWithValue는 Redux Toolkit에서 제공하는 createAsyncThunk 함수의 두 번째 매개변수인 thunkAPI 객체에 포함된 메서드입니다. 작성자가 직접 만든 것이 아니라, createAsyncThunk가 기본적으로 제공하는 기능입니다. */

// 로그인 thunk
/*
credentials = {
    email: 'test@test.com',
    password: '1111'
}
*/
export const loginUserThunk = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
   }
})

// 로그아웃 thunk
// _(언더바)는 매개변수 값이 없을 때 사용
export const logoutUserThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
   }
})

// 로그인 상태확인 thunk
export const checkAuthStatusThunk = createAsyncThunk('auth/status', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상태 확인 실패')
   }
})

/*  */

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      // 서버에서 가져오는 데이터가 배열 일때만 [] 로 초기값을 주고 나머지는 null로 준다
      // null은 주로 문자열 혹은 json 객체 데이터 일때 사용
      user: null,
      isAuthenticated: false, //로그인 상태: 로그인이 되어있으면 true 그렇지 않으면 false
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //회원가입
      builder
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      //로그인
      builder
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //로그아웃
      builder
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null //로그아웃 후 유저 정보 초기화
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      //로그인 상태 확인
      builder
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
         })
   },
})
/* 결과가 **불리언(true 또는 false)**이어야만 의미가 있다면 논리 조건문입니다.
결과가 불리언이 아니어도 되는 경우라면 단축 평가입니다. */
export default authSlice.reducer

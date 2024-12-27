import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import reviewReducer from '../features/reviewSlice'
// import pageReducer from '../features/pageSlice'
// import userReducer from '../features/userSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      reviews: reviewReducer,
      //   page: pageReducer,
      //   user: userReducer,
   },
})

export default store

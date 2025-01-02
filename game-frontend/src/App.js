// C:\lkh\project\reactNode\game-frontend\src\App.js

import './styles/common.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import Signup from './components/auth/Signup'
import LoginPage from './pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'
import ReviewPage from './pages/ReviewPage'
import ReviewCreatePage from './pages/ReviewCreatePage'
import ReviewDetailPage from './pages/ReviewDetailPage'
import ReviewEditPage from './pages/ReviewEditPage'
import Footer from './pages/Footer'
// import MyPage from './pages/MyPage'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인 상태 가져오기

   //새로고침시 redux 데이터가 사라지거나 서버에서 문제 발생 가능성이 있으므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} /* user={user} */ />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/review" element={<ReviewPage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/review/create" element={<ReviewCreatePage />} />
            <Route path="/review/:id" element={<ReviewDetailPage />} />
            <Route path="/review/edit/:id" element={<ReviewEditPage />} />
            {/* <Route path="/my/:id" element={<MyPage />} /> */}
            {/* <Route path="/my/:id" element={<MyPage auth={user} />} /> */}
         </Routes>
         <Footer />
      </>
   )
}

export default App

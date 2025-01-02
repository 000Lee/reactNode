// C:\lkh\project\reactNode\game-frontend\src\components\auth\Login.jsx

import React, { useState, useMemo, useCallback } from 'react'
/* import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material' */
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'

const Login = () => {
   const [userId, setUserId] = useState('') // 이메일 상태
   const [userPassword, setUserPassword] = useState('') // 비밀번호 상태
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (userId.trim() && userPassword.trim()) {
            //아이디와 패스워드가 둘다 입력이 되어있다면
            dispatch(loginUserThunk({ userId, userPassword }))
               .unwrap() //실패성공 여부 명확히 처리
               .then(() => navigate('/')) //로그인 성공시 메인페이지로 이동
               .catch((error) => console.error('로그인 실패:', error)) //로그인 실패시 에러 출력
         }
      },
      [dispatch, userId, userPassword, navigate]
   )

   const loginButtonContent = useMemo(() => (loading ? <p>로딩중...</p> : '로그인'), [loading]) // 로딩 상태가 변경될 때만 버튼 내용이 다시 렌더링됨

   return (
      <div className="login">
         <h1>로그인</h1>

         {error && <div className="error">{error}</div>}

         <form onSubmit={handleLogin}>
            <div className="loginBox">
               <label htmlFor="userId">아이디</label>
               <input type="text" id="userId" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>

            <div className="loginBox">
               <label htmlFor="userPassword">비밀번호</label>
               <input type="password" id="userPassword" name="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            </div>

            <button type="submit" disabled={loading}>
               {loginButtonContent}
            </button>
         </form>

         <div className="gotoSignup">
            <ul>
               <li style={{ color: '#e6b1ff', opacity: '0.7' }}>계정이 없으신가요? </li>
               <li>
                  <Link to="/signup">회원가입</Link>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default Login

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUserThunk } from '../../features/authSlice'

const Signup = () => {
   const [userId, setUserId] = useState('')
   const [nick, setNick] = useState('')
   const [userPassword, setUserPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false) // 회원가입 완료 상태 추가
   const dispatch = useDispatch()
   //액션을 스토어에 전달하여 상태를 업데이트
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(() => {
      if (!userId.trim() || !nick.trim() || !userPassword.trim() || !confirmPassword.trim()) {
         alert('모든 필드를 입력해주세요!')
         return
      }

      if (userPassword !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }

      dispatch(registerUserThunk({ userId, nick, userPassword }))
         .unwrap()
         .then(() => {
            //회원가입 성공시
            setIsSignupComplete(true) //회원가입 완료 상태 true로 변경
         })
         .catch((error) => {
            //회원가입 중 에러 발생시
            console.error('회원가입 에러:', error)
         })
   }, [userId, nick, userPassword, confirmPassword, dispatch])

   //회원가입이 완료 되었을때 보일 컴포넌트
   if (isSignupComplete) {
      return (
         <div className="isSignupComplete">
            <h2>회원가입이 완료되었습니다! </h2>
            <h2>로그인을 통해 서비스를 이용해 보세요 </h2>
            <div>
               <Link to="/login">로그인페이지로 이동</Link>{' '}
            </div>
         </div>
      )
   }

   return (
      <div className="signup">
         <h1>회원가입</h1>

         {error && <div>{error}</div>}

         <div className="signupBox">
            <label htmlFor="nick">닉네임</label>
            <input type="text" id="nick" value={nick} onChange={(e) => setNick(e.target.value)} />
         </div>

         <div className="signupBox">
            <label htmlFor="userId">아이디</label>
            <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
         </div>

         <div className="signupBox">
            <label htmlFor="userPassword">비밀번호</label>
            <input type="password" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
         </div>

         <div className="signupBox1">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
         </div>

         <button onClick={handleSignup} disabled={loading}>
            {loading ? '처리 중...' : '가입하기'}
         </button>
      </div>
   )
}

export default Signup

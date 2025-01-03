// C:\lkh\project\reactNode\game-frontend\src\components\shared\Navbar.jsx

import { Link, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'

const Navbar = ({ isAuthenticated, user }) => {
   const { heart, star } = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/') //로그아웃 완료 후 메인페이지로 이동
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigate])

   return (
      <>
         <div className="banner">
            출시 기념 리뷰이벤트!&nbsp;&nbsp; 최초 리뷰 입력시 랜덤으로 게임 아이템을
            드립니다!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출시
            기념 리뷰이벤트!&nbsp;&nbsp; 최초 리뷰 입력시 랜덤으로 게임 아이템을
            드립니다!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;출시
            기념 리뷰이벤트! &nbsp;&nbsp;최초 리뷰 입력시 랜덤으로 게임 아이템을 드립니다!
         </div>
         <div className="header">
            <Link to="/">
               <div className="princessSofia">
                  LUNAR
                  <br />
                  EffecT
               </div>
            </Link>
            {isAuthenticated ? (
               <div className="loginTrueWrap">
                  <ul className="loginTrue">
                     <li>{user?.nick}</li>
                     <li>
                        <ul className="heartCount">
                           <li>♥</li>
                           <li>{heart}</li>
                        </ul>
                     </li>
                     <li>
                        <ul className="starCount">
                           <li>★</li>
                           <li>{star}</li>
                        </ul>
                     </li>
                     <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        로그아웃
                     </li>
                  </ul>
               </div>
            ) : (
               <div className="loginFalseWrap">
                  <Link to="/login">로그인</Link>
               </div>
            )}
         </div>
      </>
   )
}

export default Navbar

/* user?.nick의 의미
user가 null이거나 undefined라면, user.nick에 접근하려고 시도하지 않고 그냥 undefined를 반환합니다.
그렇지 않다면 user.nick의 값을 반환합니다. */

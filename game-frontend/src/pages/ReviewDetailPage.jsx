// C:\reactNode-main\game-frontend\src\pages\ReviewDetailPage.jsx

import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchReviewByIdThunk } from '../features/reviewSlice'
import { deleteReviewThunk } from '../features/reviewSlice'

const ReviewDetailPage = () => {
   const { id } = useParams() // URL에서 리뷰 ID 가져오기
   const dispatch = useDispatch()
   const navigate = useNavigate() // 뒤로가기 기능을 위한 훅
   const { review, loading, error } = useSelector((state) => state.reviews)
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인 상태 가져오기
   useEffect(() => {
      dispatch(fetchReviewByIdThunk(id)) // 특정 리뷰 데이터 가져오기
   }, [dispatch, id])

   const onClickDelete = useCallback(
      (id) => {
         dispatch(deleteReviewThunk(id))
            .unwrap()
            .then(() => {
               // navigate('/') => spa방식
               window.location.href = '/review' // 페이지 이동 => 전체 페이지 새로고침
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다', error)
            })
      },
      [dispatch]
   )

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러 발생: {error}</p>
   if (!review) return <p>리뷰를 찾을 수 없습니다.</p>

   return (
      <div>
         <h1>리뷰 상세</h1>
         <p>{review.content}</p>
         <p>작성자: {review.User.nick}</p>
         <Link to={`/review/edit/${review.id}`}>
            {isAuthenticated && review.UserId === user.id && (
               <ul className="grid2">
                  <li style={{ cursor: 'pointer' }}>
                     <Link to={`/review/edit/${review.id}`}>✏️</Link>
                  </li>

                  <li style={{ cursor: 'pointer' }} onClick={() => onClickDelete(review.id)}>
                     🗑️
                  </li>
               </ul>
            )}
         </Link>
         {/* 뒤로가기 버튼 */}
         <button
            style={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={() => navigate(`/review`)} // 이전 페이지로 이동
         >
            뒤로가기
         </button>
      </div>
   )
}

export default ReviewDetailPage

// navigate(-1); 한칸 뒤로감

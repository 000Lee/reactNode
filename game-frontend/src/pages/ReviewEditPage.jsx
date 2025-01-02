// C:\reactNode-main\game-frontend\src\pages\ReviewEditPage.jsx

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchReviewByIdThunk, updateReviewThunk } from '../features/reviewSlice'

const ReviewEditPage = () => {
   const { id } = useParams() // URL에서 리뷰 ID 가져오기
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { review, loading, error } = useSelector((state) => state.reviews)
   const [content, setContent] = useState('')

   useEffect(() => {
      dispatch(fetchReviewByIdThunk(id)) // 특정 리뷰 데이터 가져오기
   }, [dispatch, id])

   useEffect(() => {
      if (review) {
         setContent(review.content) // 기존 리뷰 내용 설정
      }
   }, [review])

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         await dispatch(updateReviewThunk({ id, reviewData: { content } })).unwrap()
         alert('리뷰가 수정되었습니다!')
         navigate(`/review/${id}`) // 수정 완료 후 상세 페이지로 이동
      } catch (error) {
         console.error('리뷰 수정 중 오류:', error)
         alert('리뷰 수정에 실패했습니다.')
      }
   }

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러 발생: {error}</p>
   if (!review) return <p>리뷰를 찾을 수 없습니다.</p>

   return (
      <div>
         <h1>리뷰 수정</h1>
         <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit" style={{ cursor: 'pointer' }}>
               수정하기
            </button>
         </form>
      </div>
   )
}

export default ReviewEditPage

// C:\lkh\project\reactNode\game-frontend\src\pages\ReviewCreatePage.jsx

/* import { Container } from '@mui/material' */
import ReviewForm from '../components/review/ReviewForm'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { createReviewThunk } from '../features/reviewSlice'

const ReviewCreatePage = () => {
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (reviewData) => {
         //postData: 사용자가 입력한 게시물 데이터
         /*
      postData = {
        content: '여행중입니다',
        hashtags: '#여행 #맛집',
        img: 파일객체
      }
      */

         dispatch(createReviewThunk(reviewData))
            .unwrap()
            .then(() => {
               //navigate('/') //게시물 등록 후 메인페이지로 이동
               window.location.href = '/review' // 페이지 이동 => 전체 페이지 새로고침
            })
            .catch((error) => {
               console.error('게시물 등록 에러: ', error)
               alert('게시물 등록에 실패했습니다.', error)
            })
      },
      [dispatch]
   )

   return (
      <div className="reviewCreate">
         <h1>리뷰</h1>
         <h2>리뷰를 작성해주세요</h2>
         <ReviewForm onSubmit={handleSubmit} />
      </div>
   )
}

export default ReviewCreatePage

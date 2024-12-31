// C:\lkh\project\reactNode\game-frontend\src\pages\ReviewPage.jsx

import { Pagination, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewsThunk } from '../features/reviewSlice'
import ReviewItem from '../components/review/ReveiwItem'

const ReviewPage = ({ isAuthenticated, user }) => {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()
   const { reviews, pagination, loading, error } = useSelector((state) => state.reviews)

   useEffect(() => {
      dispatch(fetchReviewsThunk(page))
   }, [dispatch, page])

   // 페이지 변경
   const handlePageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   return (
      <div>
         <div>리뷰</div>
         <h1>신규 이벤트!</h1>
         <p>리뷰 작성시 가챠 1회 증정</p>
         <Link to="/review/create">Click Here!</Link>
         {loading && <p>로딩 중...</p>}

         {error && <p>에러 발생: {error}</p>}

         {reviews.length > 0 ? (
            <>
               {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} isAuthenticated={isAuthenticated} user={user} />
               ))}
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지 수
                     page={page} // 현재 페이지
                     onChange={handlePageChange} //페이지를 변경할 함수
                  />
               </Stack>
            </>
         ) : (
            !loading && <p>게시물이 없습니다.</p>
         )}
      </div>
   )
}

export default ReviewPage

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
      <div className="reviewList">
         <h1 style={{ marginBottom: '70px' }}>리뷰</h1>
         <h2>신규 이벤트!</h2>
         <h3>최초 리뷰 작성 시 가챠 1회</h3>
         <button style={{ marginBottom: '0' }} className="buttonCreate">
            <Link to="/review/create">Click Here!</Link>
         </button>
         {loading && <p>로딩 중...</p>}

         {error && <p>에러 발생: {error}</p>}

         {reviews.length > 0 ? (
            <>
               <table>
                  <tbody>
                     {reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} isAuthenticated={isAuthenticated} user={user} />
                     ))}
                  </tbody>
               </table>
               <Stack spacing={2} sx={{ mb: 29, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지 수
                     page={page} // 현재 페이지
                     onChange={handlePageChange} //페이지를 변경할 함수
                     sx={{
                        '& .MuiPaginationItem-root': {
                           color: 'white', // 텍스트 흰색
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                           backgroundColor: 'rgba(255,255,255,0.2)', // 선택된 버튼 배경색
                           color: 'white', // 선택된 버튼 텍스트 색
                        },
                     }}
                  />
               </Stack>
            </>
         ) : (
            !loading && <p style={{ textAlign: 'center', marginTop: '40px', marginBottom: '305px' }}>게시물이 없습니다.</p>
         )}
      </div>
   )
}

export default ReviewPage

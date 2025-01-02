// C:\lkh\project\reactNode\game-frontend\src\components\review\ReveiwItem.jsx

/* import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder' */

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import { useCallback } from 'react'
import { deleteReviewThunk } from '../../features/reviewSlice'

const ReviewItem = ({ isAuthenticated, user, review }) => {
   const dispatch = useDispatch()
   console.log(review)
   //리뷰 삭제 실행
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
   return (
      <ul className="grid">
         <li>{review.User.nick}</li>

         <li>{dayjs(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}</li>
         <Link to={`/review/${review.id}`}>{review.content}</Link>

         {/* 버튼 고민 */}
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
      </ul>
   )
}

export default ReviewItem

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
   console.log(user)
   //리뷰 삭제 실행
   const onClickDelete = useCallback(
      (id) => {
         dispatch(deleteReviewThunk(id))
            .unwrap()
            .then(() => {
               // navigate('/') => spa방식
               window.location.href = '/' // 페이지 이동 => 전체 페이지 새로고침
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다', error)
            })
      },
      [dispatch]
   )
   return (
      <div>
         <div>
            {/*  Link to={`/my/${review.User.id}`} */}
            <div>
               <p>{review.UserId}</p>
            </div>
            <p>{dayjs(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p>{review.content}</p>
         </div>
         <div>
            {/* !!!!여기부터 보기 */}
            {isAuthenticated && review.UserId === user.id && (
               <div>
                  <Link to={`/review/edit/${review.id}`}>
                     <a style={{ cursor: 'pointer' }}>✏️</a>
                  </Link>
                  <a style={{ cursor: 'pointer' }} onClick={() => onClickDelete(review.id)}>
                     🗑️
                  </a>
               </div>
            )}
         </div>
      </div>
   )
}

export default ReviewItem

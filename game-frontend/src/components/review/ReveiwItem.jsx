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
      <tr className="grid">
         <td>{review.User.nick}</td>
         <td className="reviewContent">
            <Link to={`/review/${review.id}`}>{review.content}</Link>
         </td>
         <td>{dayjs(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
         {/* 버튼 고민 */}
         {isAuthenticated && review.UserId === user.id && (
            <>
               <td>
                  <Link to={`/review/edit/${review.id}`}>수정</Link>
               </td>

               <td style={{ cursor: 'pointer' }} onClick={() => onClickDelete(review.id)}>
                  삭제
               </td>
            </>
            /*  </ul> */
         )}
      </tr>
   )
}

export default ReviewItem

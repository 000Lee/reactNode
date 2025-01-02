// C:\lkh\project\reactNode\game-frontend\src\components\review\ReviewForm.jsx

import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createReviewThunk } from '../../features/reviewSlice'
import { updateHeartStar } from '../../features/authSlice' // 하트와 별 상태 업데이트 액션

const ReviewForm = ({ initialValues = {} }) => {
   const [content, setContent] = useState(initialValues.content || '')
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleSubmit = useCallback(
      async (e) => {
         e.preventDefault()
         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }

         try {
            const formData = { content }
            const response = await dispatch(createReviewThunk(formData)).unwrap()
            console.log('응답 데이터:', response) // 응답 데이터를 확인

            const { heart, star } = response.user // 서버에서 반환된 하트와 별
            alert(`🎉 하트 ${heart}개, 별 ${star}개를 얻었습니다!`)

            // 하트와 별 상태 업데이트
            dispatch(updateHeartStar({ heart: response.user.heart, star: response.user.star }))

            // ReviewPage로 이동
            navigate('/review')
         } catch (error) {
            console.error('리뷰 등록 중 오류 발생:', error)
            alert('계정당 1회 참여 가능합니다.')
         }
      },
      [content, dispatch, navigate]
   )

   const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="content">리뷰</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
         </div>
         <div>
            <button type="submit" style={{ cursor: 'pointer' }}>
               {submitButtonLabel}
            </button>
         </div>
      </form>
   )
}

export default ReviewForm

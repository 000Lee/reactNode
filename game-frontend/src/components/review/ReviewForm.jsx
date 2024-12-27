import React, { useState, useCallback, useMemo } from 'react'
/* import { TextField, Button, Box } from '@mui/material' */

// 등록, 수정 폼 컴포넌트
const ReviewForm = ({ onSubmit, initialValues = {} }) => {
   /*
    initialValues = {
         id: 1,
         content: '안녕하세요', 
         img: '/dog11111344242.jpg',
         createAt: 2024-10-10 02:10:10,
         updateAt:  2024-10-10 02:10:10,
         User: {...},
         Hashtags: [
             {title: '여행', PostHashtag: {..}},
             {title: '맛집', PostHashtag: {..}},
             {title: '스위스', PostHashtag: {..}},
         ]
         
         => #여행 #맛집 #스위스
    }
   */
   //http://localhost8000/dog11111344242.jpg
   /*    const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '') // 이미지 경로(파일명 포함) */
   /*    const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체 */
   const [content, setContent] = useState(initialValues.content || '') //게시물 내용

   //작성한 내용 전송
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }
         const formData = new FormData() //폼 데이터를 쉽게 생성하고 전송할 수 있도록 하는 객체
         formData.append('content', content) //게시물 내용 추가

         //등록할때는 PostCreatePage.jsx 의 handleSubmit() 함수를 실행시킴
         //수정할때는 PostEditPage.jsx 의 handleSubmit() 함수를 실행시킴
         onSubmit(formData) //formData 객체를 전송
      },
      [content, onSubmit]
   )

   // state 변경시 등록/수정 버튼 재연산 방지
   const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

   return (
      <form onSubmit={handleSubmit}>
         {/* 리뷰 내용 입력 필드 */}
         <div>
            <label htmlFor="content">리뷰</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
         </div>

         {/* 등록 / 수정 버튼 */}
         <div>
            <button type="submit" style={{ cursor: 'pointer' }}>
               {submitButtonLabel}
            </button>
         </div>
      </form>
   )
}

export default ReviewForm

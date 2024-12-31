// C:\lkh\project\reactNode\game-frontend\src\api\gameApi.js

import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL

//axios 인스턴스 생성
const gameApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

//회원가입
export const registerUser = async (userData) => {
   try {
      // userData: 회원가입 창에서 입력한 데이터
      const response = await gameApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error //request 할때 오류 발생시 에러를 registerUser() 함수를 실행한 곳으로 던짐
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await gameApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await gameApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await gameApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//리뷰 등록
export const createReview = async (reviewData) => {
   console.log('보내는 데이터:', reviewData)
   try {
      //reviewData: 등록할 게시물 데이터가 담겨있는 json객체

      /*       const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송시 반드시 지정
         },
      } */

      const response = await gameApi.post('/review', reviewData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

/*  */
//리뷰 수정
export const updatedReview = async (id, reviewData) => {
   try {
      //postData: 수정할 게시물 데이터가 담겨있는 json객체
      const response = await gameApi.put(`/review/${id}`, reviewData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//리뷰 삭제
export const deleteReview = async (id) => {
   try {
      const response = await gameApi.delete(`/review/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//특정 리뷰 가져오기
export const getReviewById = async (id) => {
   try {
      const response = await gameApi.get(`/review/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//전체 리뷰 가져오기(페이징)
export const getReviews = async (page) => {
   try {
      const response = await gameApi.get(`/review?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

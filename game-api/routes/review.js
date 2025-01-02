// C:\lkh\project\reactNode\game-api\routes\review.js

const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Review, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

/* 여기부터 보기 */
// 리뷰 등록 로직 수정
router.post('/', isLoggedIn, async (req, res) => {
   try {
      // 이미 리뷰가 있는지 확인
      const existingReview = await Review.findOne({
         where: { UserId: req.user.id },
      })

      if (existingReview) {
         return res.status(400).json({
            success: false,
            message: '이미 리뷰를 작성하셨습니다.',
         })
      }

      // 랜덤 값 생성
      const heart = Math.floor(Math.random() * 11)
      const star = Math.floor(Math.random() * 11)

      // 리뷰 생성
      const review = await Review.create({
         content: req.body.content,
         heart,
         star,
         UserId: req.user.id,
      })

      // 사용자 정보 업데이트
      const user = await User.findByPk(req.user.id)
      user.heart += heart
      user.star += star
      await user.save()

      res.json({
         success: true,
         review: {
            id: review.id,
            content: review.content,
            heart: review.heart,
            star: review.star,
            userId: review.UserId,
         },
         user: {
            heart: user.heart,
            star: user.star,
         },
         message: '리뷰가 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '리뷰 등록 중 오류가 발생했습니다.', error })
   }
})

//게시물 수정 localhost:8000/post/:id
router.put('/:id', isLoggedIn, async (req, res) => {
   try {
      //게시물 존재 여부 확인
      // select * from posts where id = ? and UserId = ?
      const review = await Review.findOne({ where: { id: req.params.id, userId: req.user.id } })
      if (!review) {
         return res.status(404).json({ success: false, message: '리뷰를 찾을 수 없습니다.' })
      }

      //게시물 수정
      await review.update({
         content: req.body.content, //수정된 내용
      })

      //업데이트 된 게시물 다시 조회
      const updatedReview = await Review.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['userId', 'nick'], //user테이블의 id, nick 컬럼 값만 가져옴
            },
         ],
      })

      res.json({
         success: true,
         review: updatedReview,
         message: '리뷰가 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '리뷰 수정 중 오류가 발생했습니다.', error })
   }
})

//게시물 삭제 localhost:8000/post/:id
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      // 삭제할 게시물 존재 여부 확인
      const review = await Review.findOne({ where: { id: req.params.id, userId: req.user.id } })
      if (!review) {
         return res.status(404).json({ success: false, message: '리뷰를 찾을 수 없습니다.' })
      }

      // 게시물 삭제
      await review.destroy()

      res.json({
         success: true,
         message: '리뷰가 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '리뷰 삭제 중 오류가 발생했습니다.', error })
   }
})

//특정 게시물 불러오기(id로 게시물 조회) localhost:8000/post/:id
router.get('/:id', async (req, res) => {
   try {
      const review = await Review.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['userId', 'nick'],
            },
         ],
      })

      if (!review) {
         return res.status(404).json({ success: false, message: '리뷰를 찾을 수 없습니다.' })
      }

      res.json({
         success: true,
         review,
         message: '리뷰를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '리뷰를 불러오는 중 오류가 발생했습니다.', error })
   }
})

//전체 게시물 불러오기(페이징 기능) localhost:8000/post?page=1&limit=3
router.get('/', async (req, res) => {
   try {
      // parseInt('08') -> 일부 브라우저에서 NaN 반환
      // parseInt('08', 10) -> 10진수 8을 반환
      const page = parseInt(req.query.page, 10) || 1 // page번호(기본값: 1)
      const limit = parseInt(req.query.limit, 10) || 5 // 한페이지당 나타낼 게시물(레코드) 갯수(기본값: 3)
      const offset = (page - 1) * limit // 오프셋 계산

      // 게시물 레코드의 전체 갯수 가져오기
      // select count(*) from posts
      const count = await Review.count()

      // 게시물 레코드를 가져오기
      /*
         page:1, limit:3, offset: 0 -> 0개의 레코드를 건너띄고 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 0

         page:2, limit:3, offset: 3 -> 3개의 레코드를 건너띄고 4번째 부터 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 3

         page:3, limit:3, offset: 6 -> 6개의 레코드를 건너띄고 7번째 부터 3개의 최신 레코드를 가져온다
         select * from posts order by createdAt desc limit 3 offset 6
         */
      const reviews = await Review.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']], // 최신날짜 순으로 가져온다
         // 게시글을 작성한 사람과 게시글에 작성된 해시태그를 같이 가져온다
         include: [
            {
               model: User,
               attributes: ['userId', 'nick'],
            },
         ],
      })

      res.json({
         success: true,
         reviews,
         pagination: {
            totalPosts: count, // 전체 게시물 수
            currentPage: page, // 현재 페이지
            totalPages: Math.ceil(count / limit), // 총 페이지 수
            limit, // 페이지당 게시물 수
         },
         message: '전체 리뷰 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '리뷰 리스트를 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router

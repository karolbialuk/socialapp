import express from 'express'
import {
  addComment,
  getComments,
  likeComment,
  getLikedComments,
} from '../controllers/comments.js'

const router = express.Router()

router.post('/', addComment)
router.get('/', getComments)
router.post('/like', likeComment)
router.get('/like', getLikedComments)

export default router

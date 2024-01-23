import express from 'express'
import multer from 'multer'
import path from 'path'
import {
  addPost,
  getPost,
  likePost,
  getPostLikes,
} from '../controllers/posts.js'

const router = express.Router()

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Dozwolone tylko zdjęcia'), false)
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/upload')
  },
  filename: (req, file, cb) => {
    const uniqueFileName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    cb(null, uniqueFileName)
  },
})

const upload = multer({ storage: storage, fileFilter: imageFilter })

router.post('/', upload.array('images', 5), addPost)
router.get('/', getPost)
router.post('/like', likePost)
router.get('/like', getPostLikes)

export default router

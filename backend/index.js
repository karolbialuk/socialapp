import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import userRoutes from './routes/users.js'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/users', userRoutes)

app.listen(8800, () => {
  console.log('App running on 8800')
})

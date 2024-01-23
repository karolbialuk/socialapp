import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import sharp from 'sharp'
import path from 'path'
import { userInfo } from 'os'

export const addPost = async (req, res) => {
  try {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Nie jesteś zalogowany.')

    jwt.verify(token, 'secretkey', async (err, userInfo) => {
      if (err) return res.status(401).json(err)
      const files = req.files
      let uploadedFileNames = []

      if (files) {
        for (const file of files) {
          const uniqueFileName =
            Date.now() + '-' + Math.round(Math.random() * 1e9)

          const upload = '../frontend/public/upload/'

          const highResFilePath =
            upload + uniqueFileName + '_high' + path.extname(file.originalname)
          await sharp(file.path).resize(1800, 1200).toFile(highResFilePath)

          const lowResFilePath =
            upload + uniqueFileName + '_low' + path.extname(file.originalname)
          await sharp(file.path).resize(702, 468).toFile(lowResFilePath)

          uploadedFileNames.push(
            path.basename(highResFilePath),
            path.basename(lowResFilePath),
          )
        }
      } else {
        return
      }

      const q =
        'INSERT INTO posts (`text`, `username`, `data`, `userId` ,`img`) VALUE (?)'

      const currentDate = new Date().toLocaleString()

      const time =
        currentDate.split(',')[0].split('.')[0] +
        '.' +
        currentDate.split(',')[0].split('.')[1]

      const day =
        currentDate.split(',')[1].split(':')[0] +
        ':' +
        currentDate.split(',')[1].split(':')[1]

      const date = time + ', ' + day

      const values = [
        req.body.text,
        req.body.username,
        date,
        req.body.userId,
        files ? uploadedFileNames.join(',') : null,
      ]

      if (
        req.body.text === null ||
        req.body.username === null ||
        req.body.userId === null
      )
        return res.status(500).json('Wypełnij wszystkie pola.')

      db.query(q, [values], (err, data) => {
        if (err) return res.status(401).json(err)

        return res.status(200).json('Pomyślnie utworzono post.')
      })
    })
  } catch (err) {
    console.error(err)
  }
}

export const getPost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Nie jesteś zalogowany.')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const value = req.query.postId ? req.query.postId : req.query.userId

    const q = req.query.postId
      ? 'SELECT * FROM posts WHERE id = ?'
      : req.query.userId
      ? 'SELECT * FROM posts WHERE userId = ?'
      : 'SELECT * FROM posts '

    db.query(q, [value], (err, data) => {
      if (err) return res.status(401).json(err)

      return res.status(200).json(data)
    })
  })
}

export const likePost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Nie jesteś zalogowany.')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const selectQuery =
      'SELECT * FROM postlikes WHERE idPost = ? AND idUser = ?'

    db.query(selectQuery, [req.body.idPost, req.body.idUser], (err, data) => {
      if (err) return res.status(401).json(err)

      let insertQuery = data.length
        ? 'DELETE FROM postlikes WHERE idPost = ? AND idUser = ?'
        : 'INSERT INTO postlikes(`idPost`, `idUser`) values(?, ?)'

      db.query(insertQuery, [req.body.idPost, req.body.idUser], (err, data) => {
        if (err) return res.status(401).json(err)

        return res.status(200).json(data)
      })
    })
  })
}

export const getPostLikes = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Nie jesteś zalogowany.')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const q = 'SELECT * FROM postlikes WHERE idPost = ?'

    db.query(q, [req.query.idPost], (err, data) => {
      if (err) return res.status(401).json(err)

      return res.status(200).json(data)
    })
  })
}

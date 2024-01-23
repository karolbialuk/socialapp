import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const addComment = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(201).json('Nie jesteś zalogowany')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const q =
      'INSERT INTO comments(`idPost`,`idUser`,`text`, `date`) VALUES (?)'

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

    const values = [req.body.idPost, req.body.idUser, req.body.text, date]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(401).json(err)

      return res.status(200).json(data)
    })
  })
}

export const getComments = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(201).json('Nie jesteś zalogowany')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const q =
      'SELECT c.id, u.firstname, u.lastname, c.idPost, c.text, c.date FROM comments c JOIN users u ON c.idUser = u.id WHERE c.idPost = ?'

    db.query(q, [req.query.idPost], (err, data) => {
      if (err) return res.status(401).json(err)

      return res.status(200).json(data)
    })
  })
}

export const likeComment = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Nie jesteś zalogowany.')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const selectQuery =
      'SELECT * FROM commentsLikes WHERE idPost = ? AND idComment = ? AND idUser = ?'

    db.query(
      selectQuery,
      [req.body.idPost, req.body.idComment, req.body.idUser],
      (err, data) => {
        if (err) return res.status(401).json(err)

        let insertQuery = data.length
          ? 'DELETE FROM commentsLikes WHERE idPost = ? AND idComment = ? AND idUser = ?'
          : 'INSERT INTO commentsLikes(`idPost`, `idComment`, `idUser`) values(?, ?, ?)'

        db.query(
          insertQuery,
          [req.body.idPost, req.body.idComment, req.body.idUser],
          (err, data) => {
            if (err) return res.status(401).json(err)

            return res.status(200).json(data)
          },
        )
      },
    )
  })
}

export const getLikedComments = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(201).json('Nie jesteś zalogowany')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const q = 'SELECT * FROM commentsLikes WHERE idComment = ?'

    db.query(q, [req.query.idComment], (err, data) => {
      if (err) return res.status(401).json(err)

      return res.status(200).json(data)
    })
  })
}

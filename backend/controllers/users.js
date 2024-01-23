import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUsers = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Nie jesteś zalogowany.')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json(err)

    const q =
      "SELECT id, firstname, lastname FROM users WHERE CONCAT(firstname, ' ', lastname) LIKE ?"
    const searchTerm = `%${req.query.query}%`

    db.query(q, [searchTerm], (err, data) => {
      if (err) return res.status(401).json(err)

      return res.status(200).json(data)
    })
  })
}

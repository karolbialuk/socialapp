import { db } from '../connect.js'
import bcrypt from 'bcrypt'
import validator from 'email-validator'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
  const q = 'SELECT * FROM users WHERE email = ?'

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(400).json(err)

    if (data.length)
      return res.status(201).json('Użytkownik o podanym emailu już istnieje.')

    const q =
      'INSERT INTO users (`firstname`, `lastname`, `email`, `password`, `birthdate`, `gender`) values(?)'

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    if (!validator.validate(req.body.email))
      return res.status(201).json('Podany email jest nieprawidłowy.')

    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashedPassword,
      req.body.birthdate,
      req.body.gender,
    ]

    if (values.includes(''))
      return res.status(201).json('Wypełnij wszystkie pola.')

    db.query(q, [values], (err, data) => {
      if (err) return res.status(400).json(err)

      return res.status(200).json('Pomyślnie utworzono profil.')
    })
  })
}

export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE email = ?'

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(400).json(err)

    const values = [req.body.email, req.body.password]

    if (values.includes(''))
      return res.status(201).json('Wypełnij wszystkie pola.')

    if (!data.length)
      return res
        .status(201)
        .json('Użytkownik o podanym adresie email nie istnieje.')

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password,
    )

    if (!checkPassword)
      return res.status(201).json('Podane hasło jest nieprawidłowe.')

    const token = jwt.sign({ id: data[0].id }, 'secretkey')

    const { password, ...others } = data[0]

    res
      .cookie('accessToken', token, { httpOnly: true })
      .status(200)
      .json(others)
  })
}

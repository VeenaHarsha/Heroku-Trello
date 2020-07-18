const pool = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const checkEmail = await pool.query(`SELECT id FROM users WHERE email = '${email}'`)
    console.log('checking: ', checkEmail)
    if (checkEmail.rowCount > 0) {
      return res.status(400).json({ message: 'Email already exists.' })
    }
    const hashPwd = await bcrypt.hash(password, 10)

    const user = await pool.query(
      `INSERT INTO users (username, email, password, register_date)
       VALUES ('${username}', '${email}', '${hashPwd}', ${Date.now()}) RETURNING *`
    )
    // const resp = {
    //   token: '',
    //   user: {
    //     id: user.rows[0].id,
    //     username: username
    //   }
    // }

    // resp.token = jwt.sign({ user: user.rows[0].id }, '' + process.env.SECRET, {
    //   expiresIn: '3600'
    // })
    return res.status(201).json({ success: 'User Added.' })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

module.exports = { registerUser }

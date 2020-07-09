const pool = require('./database')

const getBoards = async (req, res) => {
  console.log('From Getboards query: ', req.params.userid)
  try {
    const query = `SELECT * FROM board WHERE userid= ${req.params.userid}  ORDER BY ID ASC`
    const result = await pool.query(query)
    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const addBoard = async (req, res) => {
  const { boardname, userid } = req.body
  try {
    const query =
  `INSERT INTO board (boardname, userid) VALUES ('${boardname}', ${userid}) RETURNING *`
    const result = await pool.query(query)
    return res.status(201).json({ message: 'Created Board', result: result.rows[0] })
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const updateBoardTitle = async (req, res) => {
  const { id } = req.params
  const { boardname } = req.body
  console.log('Am Here:', id, boardname)
  try {
    const query =
    `UPDATE board SET boardname = '${boardname}' WHERE id = ${id} RETURNING *`
    const result = await pool.query(query)
    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
module.exports = { getBoards, addBoard, updateBoardTitle }

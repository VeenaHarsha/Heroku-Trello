const pool = require('./database')

const getLists = async (req, res) => {
  const { boardId } = req.params
  try {
    const query =
    `SELECT * FROM lists WHERE boardid = ${boardId} ORDER BY position`
    const result = await pool.query(query)
    const lists = []
    result.rows.forEach(row => {
      row.cards = []
      lists.push(row)
    })
    console.log('GET LIST QUERY:', lists)
    return res.status(200).json(lists)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const addList = async (req, res) => {
  console.log('Add list request:', req.body)
  const { boardid, listname } = req.body
  try {
    const query =
   `INSERT INTO lists (boardid, listname) VALUES (${boardid},'${listname}') RETURNING *`
    const result = await pool.query(query)
    const newList = {
      listname: result.rows[0].listname,
      boardid: result.rows[0].boardid,
      cards: []
    }
    console.log('ADD LIST QUERY:', newList)
    return res.status(201).json({ message: 'Created List', result: newList })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create..' })
  }
}

const updateListPosition = async (req, res) => {
  const { boardId, listId } = req.query
  const { position } = req.body
  try {
    const query =
    `UPDATE lists SET position = '${position}', boardid ='${boardId}' WHERE id = ${listId} RETURNING *`
    const result = await pool.query(query)
    console.log('UPDATE LIST POSITION:', result.rows)
    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update..' })
  }
}

const updateListTitle = async (req, res) => {
  const { id } = req.params
  const { listname } = req.body
  try {
    const query = `UPDATE lists SET listname = '${listname}' WHERE id = ${id} RETURNING *`
    const result = await pool.query(query)
    console.log('UPDATE LIST TITLE:', result.rows[0])
    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update..' })
  }
}
module.exports = { getLists, addList, updateListPosition, updateListTitle }

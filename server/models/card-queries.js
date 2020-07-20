const pool = require('./database')

const getCards = async (req, res) => {
  const { boardId, listId } = req.query
  try {
    const query = `SELECT * FROM cards WHERE boardid = ${boardId} AND listid = ${listId} ORDER BY position `
    const result = await pool.query(query)
    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const addCard = async (req, res) => {
  const { boardid, listid, description } = req.body

  try {
    const query = `INSERT INTO cards (boardid,listid,description,isarchive) 
                   VALUES (${boardid},${listid},'${description}',false) RETURNING *`
    const result = await pool.query(query)
    res.status(201).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const deleteCard = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query(`DELETE FROM cards WHERE id = ${id}`)
    res.status(200).json({ message: 'Card Deleted', cardId: id })
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const updateCardPosition = async (req, res) => {
  const { cardId, listId } = req.query
  const { position } = req.body
  try {
    const query = `UPDATE cards SET position = '${position}', listid='${listId}' WHERE id = ${cardId} RETURNING *`
    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const updateListIdInCard = async (req, res) => {
  const { cardId, listId } = req.query
  try {
    const query = `UPDATE cards SET listid = '${listId}' WHERE id = ${cardId} RETURNING *`
    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const updateCardTitle = async (req, res) => {
  const { id } = req.params
  const { description } = req.body
  try {
    const query = `UPDATE cards SET description = '${description}' where id = ${id} RETURNING *`
    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const updateDuedate = async (req, res) => {
  const { cardId } = req.params
  const { dueDate } = req.body
  try {
    const query = ` UPDATE cards SET duedate = '${dueDate}' where id = ${cardId} RETURNING *`
    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
module.exports = { getCards, addCard, updateCardPosition, deleteCard, updateCardTitle, updateListIdInCard, updateDuedate }

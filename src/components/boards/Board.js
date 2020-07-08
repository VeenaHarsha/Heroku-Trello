import React, { useEffect, useState, useContext } from 'react'
import Lists from '../lists/Lists'
import { AppContext } from '../context/app/AppContext'
import { AuthContext } from '../context/auth/AuthContext'

function Board () {
  const { user } = useContext(AuthContext)
  const { showBoards, showLists, boards, getBoards, addBoard, clickBoard } = useContext(AppContext)
  const [board, setBoard] = useState({
    boardname: '',
    userid: ''
  })
  const { boardname } = board
  const [showAddBoard, setShowAddBoard] = useState(false)

  useEffect(() => {
    getBoards(user.id)
  }, [])

  const onChange = e => setBoard({ ...board, [e.target.name]: e.target.value })

  const submitBoard = async (event) => {
    event.preventDefault()
    addBoard({ boardname, userid: user.id })
    setBoard({
      boardName: '',
      userid: ''
    })
    setShowAddBoard(!showAddBoard)
  }

  return (
    <div className='container'>
      {showAddBoard &&
        <div className='board-div'>
          <form className='add-board-form' onSubmit={submitBoard}>
            <input
              type='text'
              className='board-input'
              placeholder='Add Board..'
              name='boardname'
              value={boardname}
              onChange={onChange}
            />
            <button
              type='submit'
              className='close-board-button'
            >
              Add
            </button>
          </form>
        </div>}
      <div className='main-board-div'>
        {showBoards &&
          <>
            {boards.length && boards.map((board, i) => (
              <div
                key={i}
                className='board-display'
                onClick={() => clickBoard({ selBoardId: board.id, selBoardName: board.boardname })}
              >
                {board.boardname}
              </div>
            ))}
            <div
              className='create-board-div'
              onClick={() => { setShowAddBoard(!showAddBoard) }}
            >
              Create New Board
            </div>
          </>}
      </div>
      <div className='list-div-container'>
        {showLists && <Lists />}
      </div>
    </div>
  )
}
export default Board

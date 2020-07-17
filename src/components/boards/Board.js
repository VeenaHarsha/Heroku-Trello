import React, { useEffect, useState, useContext } from 'react'
import BoardItem from './BoardItem'
import { AppContext } from '../context/app/AppContext'
import { AuthContext } from '../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'

function Board () {
  const { user, isAuthenticated } = useContext(AuthContext)
  const { boards, getBoards, addBoard } = useContext(AppContext)
  const [board, setBoard] = useState({
    boardname: '',
    userid: ''
  })
  const { boardname } = board
  const [showAddBoard, setShowAddBoard] = useState(false)

  useEffect(() => {
    getBoards(user)
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
    <>
      {!isAuthenticated
        ? (<Redirect to='/' />)
        : (
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
              {boards.length && boards.map((board, i) => (
                <BoardItem key={board.id} board={board} />
              ))}
              <div
                className='create-board-div'
                onClick={() => { setShowAddBoard(!showAddBoard) }}
              >
            Create New Board
              </div>
            </div>
          </div>)}
    </>
  )
}
export default Board

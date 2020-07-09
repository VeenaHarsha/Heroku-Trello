import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/app/AppContext'

function BoardItem ({ board }) {
  const { clickBoard } = useContext(AppContext)

  return (
    <Link style={{ textDecoration: 'none' }} to={`/board/${board.id}`}>
      <div
        className='board-display'
        onClick={() => clickBoard({ selBoardId: board.id, selBoardName: board.boardname })}
      >
        <p>{board.boardname}</p>
      </div>
    </Link>
  )
}

export default BoardItem

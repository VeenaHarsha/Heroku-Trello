import React, { useState, useEffect, useReducer, useContext } from 'react'
import { initialState, cardReducer } from './CardReducer'
import { AppContext } from '../context/app/AppContext'

function MoveCard ({ card, list }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { boards, selBoard, handleMoveCard } = useContext(AppContext)
  const [boardSelect, setBoardSelect] = useState(selBoard)
  const [listSelect, setListSelect] = useState(list.id)
  const [filtLists, setFiltLists] = useState([])

  useEffect(() => {
    getListOfSelBoard(boardSelect)
  }, [boardSelect, listSelect])

  const getListOfSelBoard = async (boardSelect) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`https://trello-clone-wip.herokuapp.com/trello/list/${boardSelect}`, options)
      const data = await response.json()
      setFiltLists(data)
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  const handleBoardSelChange = (e) => {
    setBoardSelect(e.target.value)
  }

  const handleListSelChange = (e) => {
    setListSelect(e.target.value)
  }
  const handleMoveCardForm = (e, card, boardSelect, listSelect) => {
    e.preventDefault()
    handleMoveCard(card, boardSelect, listSelect)
  }
  return (
    <>
      <div className={`card-editor-overlay copy-card-editor-overlay ${state.showMoveCardForm ? 'hide' : 'show'}`}>
        <div className='copy-card-header'>
          <p className='copy-card-label'>Move Card</p>
          <span
            className='copy-card-close-overlay'
            onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM_CLOSE' })}
          >
            <img className='card-del-image' src='../../../public/images/delete_26.png' alt='Delete' />
          </span>
        </div>
        <form className='copy-op-form' onSubmit={(e) => { handleMoveCardForm(e, card, boardSelect, listSelect) }}>
          <p className='copy-form-copy-to'>SELECT DESTINATION...</p>
          <div className='copy-form-select-board-div'>
            <span className='copy-form-board-inner-label'>Board</span>
            <div className='choose-board-input'>
              <select
                className='copy-form-board-desc'
                value={boardSelect}
                onChange={handleBoardSelChange}
              >
                <option value='0'> Select Board </option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.boardname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='copy-form-select-board-div'>
            <span className='copy-form-board-inner-label'>List</span>
            <div className='choose-board-input'>
              <select
                className='copy-form-board-desc'
                value={listSelect}
                onChange={handleListSelChange}
              >
                <option value='0'> Select List </option>
                {filtLists.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.listname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type='submit'
            className='btn-update-card-details'
            onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}
          >
                    MOVE
          </button>
        </form>
      </div>
    </>
  )
}
export default MoveCard

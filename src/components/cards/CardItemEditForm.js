import React, { useState, useReducer, useContext } from 'react'
import { initialState, cardReducer } from './CardReducer'
import { AppContext } from '../context/app/AppContext'

import CopyCard from './CopyCard'
import MoveCard from './MoveCard'

function CardItemEditForm ({ card, list }) {
  const { handleDeleteCard, handleCardUpdate } = useContext(AppContext)
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { showOverlay, showCopyCardForm, showMoveCardForm } = state
  const [description, setDescription] = useState(card.description)

  const handleEditTextArea = (e) => {
    setDescription(e.target.value)
  }
  const handleDelete = (e, card) => {
    e.preventDefault()
    handleDeleteCard(card)
  }
  const handleUpdateCard = (e, card) => {
    e.preventDefault()
    handleCardUpdate(card, description)
    dispatch({ type: 'HANDLE_CLOSE_OVERLAY' })
  }
  return (
    <>
      <div className={`card-editor-overlay ${showOverlay ? 'hide' : 'show'}`}>
        <div
          className='close-overlay'
          onClick={() => dispatch({ type: 'HANDLE_CLOSE_OVERLAY' })}
        >
            CLOSE
        </div>
        <div className='card-editor'>
          <form className='card-edit-div'>
            <div>
              <textarea
                className='edit-card-name'
                value={description}
                onChange={handleEditTextArea}
              />
            </div>
            <button
              className='save-card-name'
              type='submit'
              onClick={(e) => handleUpdateCard(e, card)}
            >
                Save
            </button>
          </form>
          <div className='card-ops-div'>
            <form className='card-ops-a-tag'>
              <img className='card-image' src={require('../../images/copy.png')} alt='Copy' />
              <p
                className='card-label'
                onClick={() => dispatch({ type: 'HANDLE_COPY_CARD_FORM' })}
              >
                      Copy
              </p>
            </form>
            <form className='card-ops-a-tag'>
              <img className='card-image' src={require('../../images/move.png')} alt='Move' />
              <p
                className='card-label'
                onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}
              >
                    Move
              </p>
            </form>
            <form className='card-ops-a-tag'>
              <img className='card-image' src={require('../../images/clock.png')} alt='Move' />
              <p className='card-label'>Change Due Date</p>
            </form>
            <form className='card-ops-a-tag'>
              <img className='card-image' src={require('../../images/delete-52.png')} alt='Delete' />
              <p
                className='card-label'
                onClick={(e) => { handleDelete(e, card) }}
              >
                    Delete
              </p>
            </form>
          </div>
        </div>
      </div>
      {showCopyCardForm &&
        <CopyCard
          card={card}
          list={list}
        />}
      {showMoveCardForm &&
        <MoveCard
          card={card}
          list={list}
        />}
    </>
  )
}

export default CardItemEditForm

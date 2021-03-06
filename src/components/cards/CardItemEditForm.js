import React, { useState, useReducer, useContext } from 'react'
import { initialState, cardReducer } from './CardReducer'
import { AppContext } from '../context/app/AppContext'
import CopyCard from './CopyCard'
import MoveCard from './MoveCard'
import CardDueOn from './CardDueOn'

function CardItemEditForm ({ card, list }) {
  const { handleDeleteCard, handleCardUpdate } = useContext(AppContext)
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { showOverlay, showCopyCardForm, showMoveCardForm, showDueDateForm } = state
  const [description, setDescription] = useState(card.description)

  const handleEditTextArea = (e) => {
    setDescription(e.target.value)
  }
  const handleDelete = (e, card) => {
    e.preventDefault()
    handleDeleteCard(card)
    dispatch({ type: 'HANDLE_CLOSE_OVERLAY' })
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
          <div className='card-edit-div'>
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
          </div>
          <div className='card-ops-div'>
            <div className='card-ops-a-tag'>
              <img className='card-image' src='/images/copy.png' alt='Copy' />
              <p
                className='card-label'
                onClick={() => dispatch({ type: 'HANDLE_COPY_CARD_FORM' })}
              >
                      Copy
              </p>
            </div>
            <div className='card-ops-a-tag'>
              <img className='card-image' src='/images/move.png' alt='Move' />
              <p
                className='card-label'
                onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}
              >
                    Move
              </p>
            </div>
            <div className='card-ops-a-tag'>
              <img className='card-image' src='/images/clock.png' alt='Move' />
              <p className='card-label' onClick={() => dispatch({ type: 'HANDLE_DUEDATE_FORM' })}>Change Due Date</p>
            </div>
            <div className='card-ops-a-tag'>
              <img className='card-image' src='/images/delete_26.png' alt='Delete' />
              <p
                className='card-label'
                onClick={(e) => { handleDelete(e, card) }}
              >
                    Delete
              </p>
            </div>
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
      {showDueDateForm &&
        <CardDueOn
          card={card}
          list={list}
        />}
    </>
  )
}

export default CardItemEditForm

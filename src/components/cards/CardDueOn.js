import React, { useReducer } from 'react'
import { initialState, cardReducer } from './CardReducer'

function CardDueOn ({ card, list }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    console.log('Vas:', { [name]: value })
  }
  return (
    <>
      <div className={`card-editor-overlay copy-card-editor-overlay ${state.showDueDateForm ? 'hide' : 'show'}`}>
        <div className='copy-card-header'>
          <p className='copy-card-label'>Change Due Date</p>
          <span
            className='copy-card-close-overlay'
            onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM_CLOSE' })}
          >
            <img className='card-del-image' src='/images/delete_26.png' alt='Close' />
          </span>
        </div>
        <form className='copy-op-form' onC>
          <label> Due Date </label>
          <input
            type='date'
            name='dueDate'
            defaultValue={new Date(card.dueDate)}
            onChange={handleInputChange}
          />
          <button
            type='submit'
            className='btn-update-card-details'
            onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}
          >
            Save
          </button>
          <button
            type='submit'
            className='btn-update-card-details'
            onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}
          >
            Remove
          </button>
        </form>
      </div>
    </>

  )
}
export default CardDueOn

import React, { useContext, useState, useReducer } from 'react'
import { AppContext } from '../context/app/AppContext'
import { initialState, cardReducer } from './CardReducer'

function CardDueOn ({ card }) {
  const { handleDueDate } = useContext(AppContext)
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const [duedate, setDuedate] = useState(card.duedate)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleDueDate(card.id, duedate)
  }
  const handleChangeInput = (e) => {
    setDuedate(e.target.value)
  }
  return (
    <>
      <div className={`card-editor-overlay duedate-overlay ${state.showDueDateForm ? 'hide' : 'show'}`}>
        <div className='copy-card-header'>
          <p className='copy-card-label'>Change Due Date</p>
          <span
            className='copy-card-close-overlay'
            onClick={() => dispatch({ type: 'HANDLE_DUEDATE_FORM_CLOSE' })}
          >
            <img className='card-del-image' src='/images/delete_26.png' alt='Close' />
          </span>
        </div>

        <form className='copy-op-form' onSubmit={handleSubmit}>
          <label> Due Date </label>
          <input
            type='date'
            value={duedate.slice(0, 10)}
            onChange={handleChangeInput}
          />
          <button
            type='submit'
            className='btn-update-card-details'
            onClick={() => dispatch({ type: 'HANDLE_DUEDATE_FORM' })}
          >
            Save
          </button>
        </form>
      </div>
    </>

  )
}
export default CardDueOn

import React, { useReducer, useContext, useState } from 'react'
import { initialState, cardReducer } from './CardReducer'
import { AppContext } from '../context/app/AppContext'

function CardDueOn ({ card }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { handleDueDate } = useContext(AppContext)
  const [duedate, setDuedate] = useState(new Date(card.duedate))

  const handleInputChange = (event) => {
    setDuedate(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleDueDate(card.id, duedate)
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
            // value={dueDate}
            defaultValue={new Date(duedate).toLocaleString()}
            // value={new Date(duedate).toLocaleString()}
            onChange={handleInputChange}
          />
          <button
            type='submit'
            className='btn-update-card-details'
            onClick={() => dispatch({ type: 'HANDLE_DUEDATE_FORM' })}
          >
            Save- A-{new Date(duedate).toLocaleString()}
          </button>
        </form>
      </div>
    </>

  )
}
export default CardDueOn

import React, { useEffect, useContext, useState } from 'react'
import CardItem from './CardItem'
import { AppContext } from '../context/app/AppContext'

function CardsList ({ list }) {
  const { selBoard, getListCards, addCard, lists } = useContext(AppContext)
  const [cardDesc, setCardDesc] = useState('')
  const [showCardInput, setShowCardInput] = useState(false)

  const selListId = list.id

  useEffect(() => {
    getListCards(selBoard, selListId)
  }, [selBoard])

  const submitAddCard = async (event) => {
    event.preventDefault()
    addCard(selBoard, selListId, cardDesc)
    setCardDesc('')
    setShowCardInput(!showCardInput)
  }

  const handleCardInput = (e) => {
    setCardDesc(e.target.value)
  }

  return (

    <div className='card-container'>
      {lists.map(({ id, cards }, i) => id === selListId && (
        <div
          key={i}
          className='card-list'
        >
          {cards.map((card, j) => card.listid === selListId &&
            <CardItem
              key={j}
              card={card}
              list={list}
              selBoard={selBoard}
              selList={selListId}
            />)}
        </div>
      ))}

      {!showCardInput
        ? <div className='add-card-div'>
          <span className='plus-img'>+</span>
          <a
            className='add-card-link'
            onClick={() => setShowCardInput(!showCardInput)}
          >
              Add a Card
          </a>
          </div> : null}
      {showCardInput
        ? <form className='card-form' onSubmit={submitAddCard}>
          <textarea
            type='text'
            className='card-text-input'
            placeholder='Enter title for this card..'
            value={cardDesc}
            onChange={handleCardInput}
          />
          <button className='add-card-btn'>Add Card</button>
          <span
            className='X-image'
            onClick={() => setShowCardInput(!showCardInput)}
          >X
          </span>
          </form> : null}
    </div>
  )
}
export default CardsList

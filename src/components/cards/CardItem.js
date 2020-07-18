import React, { useReducer, useContext } from 'react'
import { initialState, cardReducer } from './CardReducer'
import CardItemEditForm from './CardItemEditForm'
import { AppContext } from '../context/app/AppContext'

function CardItem ({ card, list, selBoard, selList }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { showCardEdit } = state
  const { moveCardInSameList, moveCardInDiffList } = useContext(AppContext)

  const handleDragStart = (e, card) => {
    console.log('Card is :', card)
    e.target.style.opacity = '0.4'
    const cardObj = JSON.stringify(card)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('card', cardObj)
  }
  const handleDragEnd = (e) => {
    e.target.style.opacity = ''
    e.currentTarget.style.border = ''
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    e.currentTarget.style.border = 'dashed'
  }

  const handleDragLeave = (e) => {
    e.currentTarget.style.border = 'none'
  }
  const moveCardSameList = (event, sourceObj, targetObj) => {
    event.preventDefault()
    console.log('Hey Details r:', sourceObj, targetObj, selBoard, selList)
    moveCardInSameList(sourceObj, targetObj, selBoard, selList)
  }
  const moveCardAcrossList = (event, sourceObj, targetObj) => {
    event.preventDefault()
    moveCardInDiffList(sourceObj, targetObj, selBoard, selList)
  }

  const updateCardPosition = (event, draggedObj, targetObj) => {
    // Need to look into this
    event.preventDefault()
    const prevElements = list.cards.map(card => (
      (card.position < targetObj.position) ? card.position : ''
    ))
    const prevElePos = (prevElements.length - 2) > 0 ? prevElements[prevElements.length - 2] : ''
    draggedObj.position = draggedObj.position < targetObj.position ? targetObj.position + 1 : (prevElePos + targetObj.position) / 2
    draggedObj.listid === targetObj.listid ? moveCardSameList(event, draggedObj, targetObj) : moveCardAcrossList(event, draggedObj, targetObj)
  }

  const handleDrop = (e, target) => {
    e.stopPropagation()
    e.preventDefault()
    const draggedObj = JSON.parse(e.dataTransfer.getData('card'))
    updateCardPosition(e, draggedObj, target)
    // e.dataTransfer.clearData()
  }
  return (
    <>
      <div
        className='card-div'
        draggable
        onDragStart={(e) => handleDragStart(e, card)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e, card)}
      >
        <p className='card-desc'>
          {card.description}
        </p>

        <span
          onClick={() => dispatch({ type: 'HANDLE_EDIT_CARD' })}
        >
          <img className='card-edit-image' src='../../../public/images/edit.png' alt='Edit' />
        </span>
      </div>
      {showCardEdit &&
        <CardItemEditForm
          card={card}
          list={list}
        />}
    </>
  )
}
export default CardItem

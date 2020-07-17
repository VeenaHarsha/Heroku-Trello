import React, { useState, useContext } from 'react'
import CardsList from '../cards/CardsList'
import { AppContext } from '../context/app/AppContext'
import deleteImage from '../../../images/delete_26.png'

function ListItem ({ list }) {
  const { updateListTitle } = useContext(AppContext)
  const [editListTitle, setEditListTitle] = useState(false)
  const [listName, setListName] = useState(list.listname)

  const handleDragStart = (e, list) => {
    console.log('List Being dragged is :', list)
    e.target.style.opacity = '0.4'
    const listObj = JSON.stringify(list)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('list', listObj)
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
  const handleEditClick = (e) => {
    setEditListTitle(!editListTitle)
  }
  const updateTitle = (e) => {
    e.preventDefault()
    updateListTitle(list.id, listName)
    handleEditClick()
  }
  const handleEditName = (event) => {
    setListName(event.target.value)
  }
  return (
    <div
      className='list-div'
      draggable
      onDragStart={(e) => handleDragStart(e, list)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <img className='list-del-image' src={deleteImage} alt='Delete' />
      {editListTitle
        ? <form onSubmit={updateTitle}>
          <input
            type='text'
            className='edit-list-input'
            onChange={handleEditName}
            value={listName}
          />
        </form>
        : <span
          className='list-header'
          onClick={handleEditClick}
        >
          {list.listname}
        </span>}
      <div>
        <CardsList list={list} />
      </div>
    </div>
  )
}

export default ListItem

import React, { useState, useEffect, useContext } from 'react'
import ListItem from './ListItem'
import { AppContext } from '../context/app/AppContext'

function Lists () {
  const { lists, selBoard, selBoardName, getLists, addList, updateListPosition, updateBoardTitle } = useContext(AppContext)
  const [showListInput, setShowListInput] = useState(false)
  const [editBoardTitle, setEditBoardTitle] = useState(false)
  const [boardName, setBoardName] = useState(selBoardName)

  const [list, setList] = useState({
    listname: '',
    boardid: '',
    cards: []
  })
  const { listname, cards } = list

  useEffect(() => {
    console.log('Selected board is:', selBoard)
    getLists(selBoard)
  }, [])
  const onChange = e => setList({ ...list, [e.target.name]: e.target.value })

  const handleAddList = (e) => {
    setShowListInput(!showListInput)
  }

  const submitList = async (event) => {
    event.preventDefault()
    addList({ listname, boardid: selBoard, cards })
    setList({
      listname: '',
      boardid: '',
      cards: []
    })
    setShowListInput(!showListInput)
  }

  const updateListPos = (event, sourceObj, targetObj) => {
    event.preventDefault()
    console.log('SOURCE:', sourceObj, 'TARGET:', targetObj)
    // if (sourceObj.position > targetObj.position)
    if (sourceObj.position < targetObj.position) {
      sourceObj.position = targetObj.position + 1
    } else {
      sourceObj.position = targetObj.position - 0.001
    }
    updateListPosition(sourceObj, targetObj)
  }
  const handleDragover = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, target) => {
    e.stopPropagation()
    e.preventDefault()
    const obj = JSON.parse(e.dataTransfer.getData('list'))
    updateListPos(e, obj, target)
  }
  const updateBTitle = (e) => {
    e.preventDefault()
    updateBoardTitle(selBoard, boardName)
    setEditBoardTitle(!editBoardTitle)
  }
  return (
    <>
      {editBoardTitle
        ? <form onSubmit={updateBTitle}>
          <input
            type='text'
            className='board-input'
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
          />
        </form> :
        <span
          className='disp-board-name'
          onClick={() => setEditBoardTitle(!editBoardTitle)}
        >
          {boardName}
        </span>}
      <div className='all-list-div'>
        {lists.map((list, i) => (
          <div
            key={i}
            className='drag-list'
            onDragOver={handleDragover}
            onDrop={(e) => handleDrop(e, list)}
          >
            <ListItem list={list} />
          </div>
        ))}
      </div>
      {showListInput
        ? <div>
          <form className='list-form' onSubmit={submitList}>
            <input
              placeholder='Add list..'
              type='text'
              className='add-list-input'
              onChange={onChange}
              name='listname'
              value={listname}
            />
            <button
              type='button'
              className='add-list-btn'
              onClick={handleAddList}
            >
              Close
            </button>
          </form>
          </div> : null}
      {!showListInput
        ? <div
          className='add-list-div'
          onClick={handleAddList}
          >
          Add a list
          </div> : null}
    </>
  )
}

export default Lists

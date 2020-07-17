import React, { useState, useEffect, useContext } from 'react'
import ListItem from './ListItem'
import { AppContext } from '../context/app/AppContext'
import { useHistory, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'

function Lists ({ match }) {
  const {
    lists, selBoard, selBoardName, getLists, addList,
    updateListPosition, updateBoardTitle, resetState
  } = useContext(AppContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [showListInput, setShowListInput] = useState(false)
  const [editBoardTitle, setEditBoardTitle] = useState(false)
  const [boardName, setBoardName] = useState(selBoardName)
  const history = useHistory()

  const [list, setList] = useState({
    listname: '',
    boardid: '',
    cards: []
  })
  const { listname, cards } = list

  useEffect(() => {
    getLists(match.params.id)
  }, [match.params.id])

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
  const handleClick = (e) => {
    e.preventDefault()
    history.push('/board')
    resetState()
  }
  return (
    <>
      {!isAuthenticated
        ? (<Redirect to='/' />)
        : (
          <div className='list-div-container'>
            <button className='back-button' onClick={handleClick}>Goto Boards</button>
            {editBoardTitle
              ? <form onSubmit={updateBTitle}>
                <input
                  type='text'
                  className='board-input'
                  onChange={(e) => setBoardName(e.target.value)}
                  value={boardName}
                />
                </form>
              : <span
                className='disp-board-name'
                onClick={() => setEditBoardTitle(!editBoardTitle)}
              >
                {boardName}
                </span>}

            <div className='all-list-div'>
              {lists && lists.map((list, i) => (
                <div
                  key={i}
                  className='drag-list'
                  onDragOver={handleDragover}
                  onDrop={(e) => handleDrop(e, list)}
                >
                  <ListItem list={list} />
                </div>
              ))}
              {!showListInput
                ? <div
                  className='add-list-div'
                  onClick={handleAddList}
                >
                    Add a list
                </div> : null}

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
                  </div>
                : null}
            </div>
          </div>
        )}
    </>
  )
}

export default Lists

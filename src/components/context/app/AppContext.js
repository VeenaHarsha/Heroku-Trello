import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  boards: [],
  lists: [],
  selBoard: '',
  selBoardName: '',
  showBoards: true,
  showLists: false
}

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getBoards = async (user) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`http://localhost:2809/trello/board/${user}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_BOARD_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const addBoard = async (formData) => {
    console.log('Form Data:', formData)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/board/add/', options)
      const data = await response.json()
      dispatch({ type: 'ADD_BOARD', payload: data.result })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const clickBoard = (selBoardInfo) => {
    dispatch({
      type: 'HANDLE_BOARD_CLICK',
      payload: selBoardInfo
    })
  }
  const updateBoardTitle = async (boardid, boardname) => {
    console.log('VV UPDATE BOARD TITLE:', boardid, boardname)
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({ boardname })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/trello/board/updateBoardTitle/${boardid}`, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_BOARD_TITLE', payload: data })
    } catch (err) {
      dispatch({ type: 'Error', payload: err })
    }
  }
  // List OPerations
  const getLists = async (selBoard) => {
    try {
      const response = await window.fetch(`http://localhost:2809/trello/list/${selBoard}`)
      const data = await response.json()
      dispatch({ type: 'GET_LISTS', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const addList = async (formData) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(formData)
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/list/add', options)
      const data = await response.json()
      dispatch({ type: 'ADD_LIST', payload: data.result })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const updateListPosition = async (sourceObj, targetObj) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: sourceObj.position
      })
    }
    try {
      const url = `http://localhost:2809/trello/list/updateListPosition/?listId=${sourceObj.id}&&boardId=${targetObj.boardid}`
      const response = await window.fetch(url, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_LIST_POSITION', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const updateListTitle = async (listId, listname) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listname: listname })
    }
    try {
      const url = `http://localhost:2809/trello/list/updateListTitle/${listId}`
      const response = await window.fetch(url, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_LIST_TITLE', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  // cards
  const getListCards = async (selBoard, selListId) => {
    // getLists(selBoard)
    console.log('APP CONTET:', selListId)
    if (!selListId) return null
    const url = `http://localhost:2809/trello/card/?boardId=${selBoard}&&listId=${selListId}`
    try {
      const response = await window.fetch(url)
      const data = await response.json()
      dispatch({ type: 'GET_LIST_CARDS', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const addCard = async (selBoard, selListId, cardDesc) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        boardid: selBoard,
        listid: selListId,
        description: cardDesc,
        isarchive: false
      })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/card/add', options)
      const data = await response.json()
      dispatch({ type: 'ADD_CARD', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  // Drag Drop

  const moveCardInSameList = async (sourceObj, targetObj, selBoard, selList) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: sourceObj.position
      })
    }
    try {
      const url = `http://localhost:2809/trello/card/updatePosition/?cardId=${sourceObj.id}&&listId=${targetObj.listid}`
      const response = await window.fetch(url, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_CARD_POSITION', payload: data })
      getListCards(selBoard, selList)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
    }
  }
  const moveCardInDiffList = async (sourceObj, targetObj) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: sourceObj.position
      })
    }
    try {
      const url = `http://localhost:2809/trello/card/updateListId/?cardId=${sourceObj.id}&&listId=${targetObj.listid}`
      const response = await window.fetch(url, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_LISTID', payload: data })
      dispatch({ type: 'DELETE_CARD', payload: sourceObj })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const handleDeleteCard = async (card) => {
    const options = { method: 'DELETE' }
    try {
      const respone = await window.fetch(`http://localhost:2809/trello/card/delete/${card.id}`, options)
      await respone.json()
      dispatch({ type: 'DELETE_CARD', payload: card })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const handleCardUpdate = async (card, description) => {
    const cardId = card.id
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ description: description })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/trello/card/updateCardTitle/${cardId}`, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_CARD_TITLE', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const handleCopyCard = async (description, newBoardId, newListId) => {
    addCard(newBoardId, newListId, description)
  }

  // Desc: addCardToNewDestination &  deleteFromCurrentLocation
  const handleMoveCard = (card, newBoardId, newListId) => {
    console.log('MOVING CARD DETAILS R:', card)
    handleCopyCard(card.description, newBoardId, newListId)
    handleDeleteCard(card)
  }
  return (
    <AppContext.Provider value={{
      boards: state.boards,
      lists: state.lists,
      userId: state.userId,
      selBoard: state.selBoard,
      selBoardName: state.selBoardName,
      showBoards: state.showBoards,
      showLists: state.showLists,
      getBoards: getBoards,
      addBoard: addBoard,
      clickBoard: clickBoard,
      updateBoardTitle: updateBoardTitle,
      getLists: getLists,
      addList: addList,
      updateListPosition: updateListPosition,
      updateListTitle: updateListTitle,
      getListCards: getListCards,
      addCard: addCard,
      moveCardInSameList: moveCardInSameList,
      moveCardInDiffList: moveCardInDiffList,
      handleDeleteCard: handleDeleteCard,
      handleCardUpdate: handleCardUpdate,
      handleCopyCard: handleCopyCard,
      handleMoveCard: handleMoveCard
    }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

import {
  GET_BOARD_LIST, ADD_BOARD, HANDLE_BOARD_CLICK, UPDATE_BOARD_TITLE, ADD_LIST, GET_LISTS, DELETE_CARD,
  UPDATE_LIST_POSITION, UPDATE_LIST_TITLE, ADD_CARD, GET_LIST_CARDS, UPDATE_CARD_TITLE
} from '../../../actionType'

export default (state, action) => {
  switch (action.type) {
    case GET_BOARD_LIST: {
      return {
        ...state,
        boards: action.payload
      }
    }
    case ADD_BOARD : {
      console.log('From Add_Board:', action.payload, [...state.boards, action.payload])
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    }
    case UPDATE_BOARD_TITLE: {
      console.log('From UPdate Board Title App Reducer:', action.payload)
      const newBoard = state.boards.map(board => (
        (board.id === action.payload[0].id) ? { ...board, boardname: action.payload[0].boardname }
          : board
      ))
      return {
        ...state,
        boards: newBoard
      }
    }
    case HANDLE_BOARD_CLICK : {
      console.log('Am in HandleClick!!', action.payload)
      return {
        ...state,
        selBoard: action.payload.selBoardId,
        selBoardName: action.payload.selBoardName,
        showBoards: !state.showBoards,
        showLists: !state.showLists
      }
    }

    case GET_LISTS : {
      console.log('APPREDUCER GET_LISTS1: ', action.payload)
      return {
        ...state,
        lists: action.payload
      }
    }
    case ADD_LIST : {
      console.log('From APPREDUCER ADD_LIST 1:', action.payload, state.lists)
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    }
    case UPDATE_LIST_POSITION: {
      console.log('From APPREDUCER UPDATE_LIST_POS 1:', action.payload, state.lists)
      const newList = (state.lists.map(
        list => {
          return list.id === action.payload[0].id
            ? { ...list, position: action.payload[0].position }
            : list
        }
      ))
      return {
        ...state,
        lists: newList.sort((a, b) => (a.position > b.position) ? 1 : -1)
      }
    }

    case UPDATE_LIST_TITLE: {
      console.log('From APPREDUCER UPDATE_LIST_TITLE:', action.payload, state.boards)
      return {
        ...state,
        boards: state.boards
      }
    }
    case GET_LIST_CARDS: {
      console.log('Get List Cards 1:', action.payload)
      const listId = action.payload.length > 0 ? action.payload[0].listid : 0
      const newLists =
        (state.lists.map(
          list => {
            return list.id === listId
              ? { ...list, cards: action.payload }
              : list
          }
        ))
      console.log('Get List Cards 2:', newLists)
      return {
        ...state,
        lists: [...newLists]
      }
    }
    case ADD_CARD: {
      console.log('From APPREDUCER ADD_CARD:', action.payload, state.lists)
      const newLists = (state.lists.map(
        list => {
          return list.id === action.payload[0].listid
            ? { ...list, cards: [...list.cards, action.payload[0]] }
            : list
        }
      ))
      console.log('From APPREDUCER ADD_CARD 2:', newLists)
      return {
        ...state,
        lists: newLists
      }
    }
    case 'UPDATE_CARD_POSITION': {
      console.log('UPDATE CARD POS:', action.payload)
      const newLists = (state.lists.map(
        list => {
          return list.id === action.payload[0].listid
            ? {
              ...list,
              cards: (list.cards.map(
                card => {
                  return card.id === action.payload[0].id
                    ? { ...card, position: action.payload[0].position }
                    : card
                }
              ))
            }
            : list
        }
      ))
      console.log('UPDATE CARD POS 2:', newLists)
      return {
        ...state,
        lists: newLists
      }
    }
    case 'UPDATE_LISTID': {
      const newLists = (state.lists.map(
        list => {
          return list.id === action.payload[0].listid
            ? { ...list, cards: [...list.cards, action.payload[0]] }
            : list
        }
      ))
      return {
        ...state,
        lists: newLists
      }
    }
    case DELETE_CARD: {
      const newLists = (state.lists.map(list => {
        return list.id === action.payload.listid
          ? { ...list, cards: list.cards.filter(card => card.id !== action.payload.id) }
          : list
      }
      ))
      return {
        ...state,
        lists: newLists,
        showOverlay: !state.showOverlay
      }
    }

    case UPDATE_CARD_TITLE : {
      console.log('UPDATE_CARD_TITLE:1:', action.payload)
      const newLists = (state.lists.map(list => {
        return list.id === action.payload[0].listid
          ? {
            ...list,
            cards: list.cards.map(
              card => {
                return card.id === action.payload[0].id
                  ? { ...card, description: action.payload[0].description }
                  : card
              }
            )
          }
          : list
      }))
      console.log('UPDATE CARD TITLE2:', newLists)
      return {
        ...state,
        lists: newLists
      }
    }
    case 'ERROR': {
      return {
        ...state,
        'Error: ': action.payload
      }
    }
    default:
      return state
  }
}

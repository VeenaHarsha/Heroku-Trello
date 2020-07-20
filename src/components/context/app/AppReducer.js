import {
  GET_BOARD_LIST, ADD_BOARD, HANDLE_BOARD_CLICK, UPDATE_BOARD_TITLE, ADD_LIST, GET_LISTS, DELETE_CARD,
  UPDATE_LIST_POSITION, UPDATE_LIST_TITLE, ADD_CARD, GET_LIST_CARDS, UPDATE_CARD_TITLE, UPDATE_DUE_DATE
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
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    }
    case UPDATE_BOARD_TITLE: {
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
      return {
        ...state,
        selBoard: action.payload.selBoardId,
        selBoardName: action.payload.selBoardName
      }
    }

    case GET_LISTS : {
      return {
        ...state,
        lists: action.payload
      }
    }
    case ADD_LIST : {
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    }
    case UPDATE_LIST_POSITION: {
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
      return {
        ...state,
        boards: state.boards
      }
    }
    case GET_LIST_CARDS: {
      const listId = action.payload.length > 0 ? action.payload[0].listid : 0
      const newLists =
        (state.lists.map(
          list => {
            return list.id === listId
              ? { ...list, cards: action.payload }
              : list
          }
        ))
      return {
        ...state,
        lists: [...newLists]
      }
    }
    case ADD_CARD: {
      console.log('VbVB:', action.payload)
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
    case 'UPDATE_CARD_POSITION': {
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
        lists: newLists
      }
    }

    case UPDATE_CARD_TITLE : {
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
      return {
        ...state,
        lists: newLists
      }
    }

    case UPDATE_DUE_DATE : {
      const newLists = (state.lists.map(list => {
        return list.id === action.payload[0].listid
          ? {
            ...list,
            cards: list.cards.map(
              card => {
                return card.id === action.payload[0].id
                  ? { ...card, duedate: action.payload[0].duedate }
                  : card
              }
            )
          }
          : list
      }))
      return {
        ...state,
        lists: newLists
      }
    }

    case 'RESET_STATE' : {
      return {
        ...state,
        boards: [],
        lists: [],
        selBoard: '',
        selBoardName: ''
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

import {
  HANDLE_EDIT_CARD,
  HANDLE_COPY_CARD_FORM, HANDLE_CLOSE_OVERLAY,
  HANDLE_MOVE_CARD_FORM, HANDLE_CREATE_CARD_FORM, HANDLE_MOVE_CARD_FORM_OPEN,
  HANDLE_MOVE_CARD_FORM_CLOSE, HANDLE_COPY_CARD_FORM_CLOSE
} from '../../actionType'

export const initialState = {
  cards: [],
  showCardInput: false,
  cardTitle: '',
  showOverlay: false,
  showCardEdit: false,
  showCopyCardForm: false,
  showMoveCardForm: false
}

export const cardReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_EDIT_CARD: {
      console.log('From EDIT Card:', action.type, state.showCardEdit, state.showOverlay)
      return {
        ...state,
        showCardEdit: !state.showCardEdit,
        showOverlay: !state.showOverlay
      }
    }
    case HANDLE_COPY_CARD_FORM: {
      return {
        ...state,
        showCopyCardForm: !state.showCopyCardForm
      }
    }
    case HANDLE_CREATE_CARD_FORM: {
      const isOverlay = state.showOverlay ? !state.showOverlay : state.showOverlay
      const isCardEdit = state.showCardEdit ? !state.showCardEdit : state.showCardEdit
      console.log('Checking:', state.showCardEdit, state.showOverlay)
      return {
        ...state,
        showCopyCardForm: !state.showCopyCardForm,
        showCardEdit: isCardEdit,
        showOverlay: isOverlay
      }
    }
    case HANDLE_COPY_CARD_FORM_CLOSE: {
      return {
        ...state,
        showCopyCardForm: !state.showCopyCardForm
      }
    }
    case HANDLE_MOVE_CARD_FORM: {
      const isOverlay = state.showOverlay ? !state.showOverlay : state.showOverlay
      return {
        ...state,
        showMoveCardForm: !state.showMoveCardForm,
        showOverlay: isOverlay
      }
    }
    case HANDLE_MOVE_CARD_FORM_OPEN: {
      return {
        ...state,
        showMoveCardForm: !state.showMoveCardForm
      }
    }
    case HANDLE_MOVE_CARD_FORM_CLOSE: {
      return {
        ...state,
        showMoveCardForm: !state.showMoveCardForm
      }
    }
    case HANDLE_CLOSE_OVERLAY: {
      const isMoveCardForm = state.showMoveCardForm ? !state.showMoveCardForm : state.showMoveCardForm
      const isCopyCardForm = state.showCopyCardForm ? !state.showCopyCardForm : state.showCopyCardForm
      return {
        ...state,
        showOverlay: !state.showOverlay,
        showCopyCardForm: isCopyCardForm,
        showMoveCardForm: isMoveCardForm
      }
    }
    default: {
      return state
    }
  }
}

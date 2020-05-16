import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showModal: false,
  addOrCurrent: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.OPEN_ADD_MODAL:
      return {
        ...state,
        showModal: true,
        addOrCurrent: 'add'
      }
    case actionTypes.OPEN_CURRENT_MODAL:
      return {
        ...state,
        showModal: true,
        addOrCurrent: 'current'
      }
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        addOrCurrent: null
      }
    default:
      return state;
  }
}

export default reducer;
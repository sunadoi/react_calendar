import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showModal: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        showModal: true
      }
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false
      }
    default:
      return state;
  }
}

export default reducer;
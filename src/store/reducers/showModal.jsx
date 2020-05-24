import * as actionTypes from "../actions/actionTypes";

const initialState = {
  showModal: false,
  modalType: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_ADD_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: "add",
      };
    case actionTypes.OPEN_CURRENT_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: "current",
      };
    case actionTypes.OPEN_UPDATE_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: "update",
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        modalType: null,
      };
    default:
      return state;
  }
};

export default reducer;

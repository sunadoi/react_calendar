import * as actionTypes from "../actions/actionTypes";

const initialState = {
  date: null,
  selectedDay: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.day,
      };
    case actionTypes.FETCH_TODAY:
      const today = new Date();
      return {
        ...state,
        date: today,
      };
    case actionTypes.SET_PREVIOUS_MONTH:
      const previousDate = { ...state }.date;
      const previousMonth = new Date(
        new Date(previousDate.setMonth(previousDate.getMonth() - 1)).setDate(1)
      );

      return {
        ...state,
        date: previousMonth,
      };
    case actionTypes.SET_NEXT_MONTH:
      const nextDate = { ...state }.date;
      const nextMonth = new Date(
        new Date(nextDate.setMonth(nextDate.getMonth() + 1)).setDate(1)
      );

      return {
        ...state,
        date: nextMonth,
      };
    case actionTypes.SET_SELECTED_DATE:
      const selectedDate = action.date;
      const firstDate = new Date(new Date(selectedDate.setDate(1)));

      return {
        ...state,
        date: firstDate,
      };
    default:
      return state;
  }
};

export default reducer;

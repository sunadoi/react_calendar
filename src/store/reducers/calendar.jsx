import * as actionTypes from '../actions/actionTypes';

const initialState = {
  today: null,
  date: null
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_TODAY:
      const today = new Date()
      return {
        ...state,
        today: today,
        date: today
      }
    case actionTypes.SET_PREVIOUS_MONTH:
      const previousDate = {...state}.date;
      const previousMonth = new Date(new Date(previousDate.setMonth(previousDate.getMonth() - 1)).setDate(1))
      console.log(previousMonth)
      return {
        ...state,
        date: previousMonth
      }

    default:
      return state;
  }
}

export default reducer;
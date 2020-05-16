import * as actionTypes from '../actions/actionTypes';

const initialState = {
  schedules: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_SCHEDULE:
      const updatedSchedules = [...state.schedules]
      if (action.schedule.title === '') action.schedule.title = 'タイトルなし'
      updatedSchedules.push(action.schedule);

      return {
        ...state,
        schedules: updatedSchedules
      }
    default:
      return state;
  }
}

export default reducer;
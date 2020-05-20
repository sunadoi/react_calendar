import * as actionTypes from '../actions/actionTypes';

const initialState = {
  schedules: [],
  selectedSchedule: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_SCHEDULE:
      const updatedSchedules = [...state.schedules]
      if (action.schedule.title === '') action.schedule.title = '(タイトルなし)'
      updatedSchedules.push(action.schedule);

      return {
        ...state,
        schedules: updatedSchedules
      }
    case actionTypes.SET_SELECTED_SCHEDULE:
      const schedules = []
      state.schedules.map(schedule => {
        return schedule.date === action.day ? schedules.push(schedule) : null
      })
      const selectedSchedule = schedules[action.index]

      return {
        ...state,
        selectedSchedule: selectedSchedule
      }
    default:
      return state;
  }
}

export default reducer;
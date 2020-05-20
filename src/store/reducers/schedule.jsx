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
      const selectedSchedules = [...state.schedules]
      let count = 0; //countによって日付が同じ日の中でindexをカウントする
      selectedSchedules.map(schedule => {
        if (schedule.date === action.day ) {
          schedules.push(schedule);
          count === action.index ? schedule.selected = true : schedule.selected = false //同じ日付の中でもselectedにするものを1つだけにするため
          count += 1;
        } else {
          return schedule.selected = false
        }
      })

      const selectedSchedule = schedules[action.index]

      return {
        ...state,
        schedules: selectedSchedules,
        selectedSchedule: selectedSchedule
      }
    case actionTypes.REMOVE_SCHEDULE:
      const removedSchedules = state.schedules.filter(schedule => schedule.selected === false);
      console.log(removedSchedules)

      return {
        ...state,
        schedules: removedSchedules,
        selectedSchedule: null
      }
    default:
      return state;
  }
}

export default reducer;
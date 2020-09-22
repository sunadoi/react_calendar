import * as actionTypes from "../actions/actionTypes";

const initialState = {
  schedules: null,
  selectedSchedule: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SCHEDULES:
      return {
        ...state,
        schedules: action.schedules,
      };
    case actionTypes.ERROR_SCHEDULE:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.SET_SELECTED_SCHEDULE:
      const schedules = [...state.schedules];
      const selectedDaySchedules = schedules.filter((schedule) => {
        return schedule.date === action.day;
      });

      const selectedSchedules = selectedDaySchedules.map((schedule, index) => {
        schedule.selected = index === action.index;

        return schedule;
      });

      const selectedSchedule = selectedSchedules[action.index];

      return {
        ...state,
        schedules: selectedSchedules,
        selectedSchedule: selectedSchedule,
      };
    case actionTypes.REMOVE_SCHEDULE:
      const removedSchedules = state.schedules.filter(
        (schedule) => schedule.selected === false
      );

      return {
        ...state,
        schedules: removedSchedules,
        selectedSchedule: null,
      };
    default:
      return state;
  }
};

export default reducer;

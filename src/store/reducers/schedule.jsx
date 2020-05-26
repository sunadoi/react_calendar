import * as actionTypes from "../actions/actionTypes";

const initialState = {
  schedules: null,
  selectedSchedule: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SCHEDULES:
      return {
        ...state,
        schedules: action.schedules,
      };
    case actionTypes.SET_SELECTED_SCHEDULE:
      const schedules = [];
      const selectedSchedules = { ...state.schedules };
      let count = 0; //countによって日付が同じ日の中でindexをカウントする
      Object.keys(selectedSchedules).map((scheduleKey) => {
        if (selectedSchedules[scheduleKey].date === action.day) {
          schedules.push({
            ...selectedSchedules[scheduleKey],
            id: scheduleKey,
          });
          count === action.index
            ? (selectedSchedules[scheduleKey].selected = true)
            : (selectedSchedules[scheduleKey].selected = false); //同じ日付の中でもselectedにするものを1つだけにするため
          count += 1;
        } else {
          return (selectedSchedules[scheduleKey].selected = false);
        }
      });

      const selectedSchedule = schedules[action.index];

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

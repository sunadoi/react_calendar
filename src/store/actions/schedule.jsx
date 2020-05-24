import * as actionTypes from "./actionTypes";

export const addSchedule = (schedule) => {
  return {
    type: actionTypes.ADD_SCHEDULE,
    schedule: schedule,
  };
};

export const setSelectedSchedule = (day, index) => {
  return {
    type: actionTypes.SET_SELECTED_SCHEDULE,
    day: day,
    index: index,
  };
};

export const updateSchedule = (schedule) => {
  return {
    type: actionTypes.UPDATE_SCHEDULE,
    schedule: schedule,
  };
};

export const removeSchedule = () => {
  return {
    type: actionTypes.REMOVE_SCHEDULE,
  };
};

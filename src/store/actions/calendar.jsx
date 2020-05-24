import * as actionTypes from "./actionTypes";

export const setSelectedDay = (day) => {
  return {
    type: actionTypes.SET_SELECTED_DAY,
    day: day,
  };
};

export const fetchToday = () => {
  return {
    type: actionTypes.FETCH_TODAY,
  };
};

export const setPreviousMonth = () => {
  return {
    type: actionTypes.SET_PREVIOUS_MONTH,
  };
};

export const setNextMonth = () => {
  return {
    type: actionTypes.SET_NEXT_MONTH,
  };
};

export const setSelectedDate = (date) => {
  return {
    type: actionTypes.SET_SELECTED_DATE,
    date: date,
  };
};

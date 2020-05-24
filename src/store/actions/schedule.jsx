import * as actionTypes from "./actionTypes";
import axios from "../../axios-schedules";

export const setSchedules = (schedules) => {
  return {
    type: actionTypes.SET_SCHEDULES,
    schedules: schedules,
  };
};

export const fetchSchedules = () => {
  return (dispatch) => {
    axios
      .get("https://react-calendar-c4a47.firebaseio.com/schedules.json")
      .then((response) => {
        dispatch(setSchedules(response.data));
      })
      .catch((error) => console.log(error));
  };
};

export const addSchedule = (schedule) => {
  return (dispatch) => {
    if (schedule.title === "") {
      schedule.title = "(タイトルなし)";
    }
    axios
      .post("./schedules.json", schedule)
      .then((response) => {
        dispatch(fetchSchedules());
      })
      .catch((error) => console.log(error));
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

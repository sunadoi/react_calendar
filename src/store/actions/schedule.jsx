import * as actionTypes from "./actionTypes";
import axios from "../../axios-schedules";

export const setSchedules = (schedules) => {
  return {
    type: actionTypes.SET_SCHEDULES,
    schedules: schedules,
  };
};

export const fetchSchedules = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://react-calendar-c4a47.firebaseio.com/schedules.json"
      );
      dispatch(setSchedules(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addSchedule = (schedule) => {
  return async (dispatch) => {
    if (schedule.title === "") {
      schedule.title = "(タイトルなし)";
    }
    try {
      await axios.post("./schedules.json", schedule);
      dispatch(fetchSchedules());
    } catch (error) {
      console.log(error);
    }
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
  return async (dispatch) => {
    const id = schedule.id;
    delete schedule.id;
    try {
      await axios.put(
        `https://react-calendar-c4a47.firebaseio.com/schedules/${id}.json`,
        schedule
      );
      dispatch(fetchSchedules());
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeSchedule = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://react-calendar-c4a47.firebaseio.com/schedules/${id}.json`
      );
      dispatch(fetchSchedules());
    } catch (error) {
      console.log(error);
    }
  };
};

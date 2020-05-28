import * as actionTypes from "./actionTypes";
import axios from "../../axios-schedules";
import { openErrorModal } from "./showModal";

export const setSchedules = (schedules) => {
  return {
    type: actionTypes.SET_SCHEDULES,
    schedules: schedules,
  };
};

export const errorSchedule = (error) => {
  return async (dispatch) => {
    await dispatch(openErrorModal());
    dispatch(setError(error.message));
  };
};

export const setError = (error) => {
  return {
    type: actionTypes.ERROR_SCHEDULE,
    error: error,
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
      dispatch(errorSchedule(error));
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
      dispatch(errorSchedule(error));
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
      dispatch(errorSchedule(error));
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
      dispatch(errorSchedule(error));
    }
  };
};

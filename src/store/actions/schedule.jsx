import * as actionTypes from "./actionTypes";
import axios from "../../axios-schedules";
import { openErrorModal } from "./showModal";
import { formatDate } from "../../helpers/formatDate";

export const setSchedules = (schedules) => {
  const orderedSchedules = Object.keys(schedules).map((scheduleKey) => {
    return Object.assign(schedules[scheduleKey], { id: scheduleKey });
  });

  // スケジュールを時間順で並び替える
  orderedSchedules.sort(function (a, b) {
    if (a.startTime < b.startTime) {
      return -1;
    } else {
      return 1;
    }
  });

  return {
    type: actionTypes.SET_SCHEDULES,
    schedules: orderedSchedules,
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
        `${process.env.REACT_APP_FIREBASE_URL}/schedules.json`
      );
      dispatch(setSchedules(response.data));
    } catch (error) {
      dispatch(errorSchedule(error));
    }
  };
};

export const addSchedule = (schedule, selectedDate) => {
  return async (dispatch) => {
    if (schedule.title === "") {
      schedule.title = "(タイトルなし)";
    }
    try {
      const repeatSchedulesList = [];
      for (let i = 0; i <= schedule.repeat; i++) {
        const copyDate = new Date(selectedDate);
        const repeatDate = new Date(
          copyDate.setDate(copyDate.getDate() + 7 * i)
        );
        const formatRepeatDate = formatDate(repeatDate);
        const repeatSchedule = { ...schedule, date: formatRepeatDate };
        repeatSchedulesList.push(repeatSchedule);
      }

      await Promise.all(
        repeatSchedulesList.map((schedule) => {
          return new Promise((resolve, reject) => {
            resolve(
              axios.post(
                `${process.env.REACT_APP_FIREBASE_URL}/schedules.json`,
                schedule
              )
            );
          });
        })
      );
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
        `${process.env.REACT_APP_FIREBASE_URL}/schedules/${id}.json`,
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
        `${process.env.REACT_APP_FIREBASE_URL}/schedules/${id}.json`
      );
      dispatch(fetchSchedules());
    } catch (error) {
      dispatch(errorSchedule(error));
    }
  };
};

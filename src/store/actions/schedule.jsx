import * as actionTypes from './actionTypes';

export const addSchedule = (schedule) => {
  return {
    type: actionTypes.ADD_SCHEDULE,
    schedule: schedule
  }
}
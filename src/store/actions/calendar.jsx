import * as actionTypes from './actionTypes';

export const fetchToday = () => {
  return {
    type: actionTypes.FETCH_TODAY,
  }
}

export const setPreviousMonth = () => {
  return {
    type: actionTypes.SET_PREVIOUS_MONTH
  }
}

export const setNextMonth = () => {
  return {
    type: actionTypes.SET_NEXT_MONTH
  }
}
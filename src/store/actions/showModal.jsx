import * as actionTypes from './actionTypes';

export const openAddModal = () => {
  return {
    type: actionTypes.OPEN_ADD_MODAL
  }
}

export const openCurrentModal = () => {
  return {
    type: actionTypes.OPEN_CURRENT_MODAL
  }
}

export const openUpdateModal = () => {
  return {
    type: actionTypes.OPEN_UPDATE_MODAL
  }
}

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import SubjectIcon from '@material-ui/icons/Subject';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import Modal from '../../components/UI/Modal/Modal';
import classes from './CurrentSchedule.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const CurrentSchedule = props => {

  const dialogContent = (
    <DialogContent>
      <div className={classes.content}>
        <p className={classes.title}>{props.selectedSchedule.title}</p>
        <p className={classes.date}>{props.selectedSchedule.date}</p>
      </div>
      {props.selectedSchedule.place &&
      <div className={classes.information}>
        <PlaceIcon />
        <p>{props.selectedSchedule.place}</p>
      </div>}
      {props.selectedSchedule.description &&
      <div className={classes.information}>
        <SubjectIcon />
        <p>{props.selectedSchedule.description}</p>
      </div>}
    </DialogContent>
  )

  const onDeleteSchedule = () => {
    props.closeModal();
    props.removeSchedule();
  }

  return (
    <Modal>
      <DialogActions>
        <Button onClick={() => onDeleteSchedule()} color="primary"><DeleteIcon /></Button>
        <Button onClick={() => props.closeModal()} color="primary"><CloseIcon /></Button>
      </DialogActions>
      <div className={classes.CurrentSchedule}>
        {dialogContent}
      </div>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    date: state.calendar.date,
    schedule: state.schedule.schedules,
    selectedSchedule: state.schedule.selectedSchedule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    addSchedule: (schedule) => dispatch(actions.addSchedule(schedule)),
    removeSchedule: () => dispatch(actions.removeSchedule())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSchedule);
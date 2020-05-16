import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
  }, [])

  const dialogContent = (
    <DialogContent>
      <TextField
        autoFocus
        placeholder="タイトルと日時を追加"
        margin="dense"
        fullWidth
        size='medium'
        name='title'
        // value={schedule.title}
      />
      <div>
        <AccessTimeIcon />
        <TextField
          placeholder="日時を追加"
          margin="dense"
          size='medium'
          name='date'
          // value={schedule.date}
        />
      </div>
      <div>
        <PlaceIcon />
        <TextField
          placeholder="場所を追加"
          margin="dense"
          size='medium'
          name='place'
          // value={schedule.place}
        />
      </div>
      <div>
        <SubjectIcon />
        <TextField
          placeholder="説明を追加"
          margin="dense"
          size='medium'
          name='description'
          // value={schedule.description}
        />
      </div>
    </DialogContent>
  )

  return (
    <Modal>
      <DialogActions>
        <Button onClick={() => props.closeModal()} color="primary"><DeleteIcon /></Button>
        <Button onClick={() => props.closeModal()} color="primary"><CloseIcon /></Button>
      </DialogActions>
      <div className={classes.CurrentSchedule}>
        <p>{props.selectedSchedule.title}</p>
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
    addSchedule: (schedule) => dispatch(actions.addSchedule(schedule))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSchedule);
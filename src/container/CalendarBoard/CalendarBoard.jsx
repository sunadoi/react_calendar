import React from 'react';
import classes from './CalendarBoard.module.css';

import CalendarElement from '../CalendarElement/CalendarElement';
import AddSchedule from '../AddSchedule/AddSchedule';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const calendarBoard = props => {
  const dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土" ]
  const dayOfWeekList = []
  for (let i=0; i<dayOfWeek.length; i++) {
    dayOfWeekList.push(<li className={classes.dayOfWeek}>{dayOfWeek[i]}</li>)
  }

  const weekList = []
  for (let i=1; i<=7; i++) {
    weekList.push(<CalendarElement />)
  }

  const week = (
    <div className={classes.Week}>
      {weekList}
    </div>
  );

  const weeksList = []
  for (let i=1; i<=6; i++) {
    weeksList.push(week)
  }

  const weeks = (
    <div className={classes.Weeks}>
      {weeksList}
    </div>
  )

  const modal = props.showModal ? <AddSchedule  /> : null

  return (
    <div className={classes.CalendarBoard}>
      {modal}
      <ul>{dayOfWeekList}</ul>
      {weeks}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(actions.openModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(calendarBoard);
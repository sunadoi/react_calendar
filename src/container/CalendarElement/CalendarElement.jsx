import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import classes from './CalendarElement.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const CalendarElement = props => {

  const onClickHandler = (day) => {
    props.setSelectedDay(day);
    props.openModal();
  }

  const opacity =
    props.date.getMonth() === props.day.getMonth()
      ? 1
      : 0.5

  const color =
    props.day.getFullYear() === new Date().getFullYear() &&
    props.day.getMonth() === new Date().getMonth() &&
    props.day.getDate() === new Date().getDate()
      ? 'red'
      : 'black'

  const firstDay = `${props.day.getMonth()+1}月${props.day.getDate()}日`
  const day = props.day.getDate() === 1 ? firstDay : props.day.getDate()

  return (
    <div
      className={classes.CalendarEl}
      style={{height: `calc(85vh / ${props.weekLength})`}}
      onClick={() => onClickHandler(props.day)}
    >
      <p style={{opacity: opacity, color: color}}>{day}</p>
      <Schedule day={props.day} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    date: state.calendar.date
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedDay: (day) => dispatch(actions.setSelectedDay(day)),
    openModal: () => dispatch(actions.openModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarElement);
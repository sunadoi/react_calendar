import React, { useState, useEffect } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Navbar = props => {
  const [yearMonth, setYearMonth] = useState('');

  useEffect(() => {
    props.onFetchToday();
  }, [])

  useEffect(() => {
    if (props.date) {
      setYearMonth(`${props.date.getFullYear()}年${props.date.getMonth() + 1}月`)
    }
  }, [props.date])

  const onPreviousMonthHandler = () => {
    props.onPreviousMonth()
  }

  const onNextMonthHandler = () => {
    props.onNextMonth()
  }

  return (
    <div className={classes.Navbar}>
      <ul>
        <li><ViewHeadlineIcon /></li>
        <li><CalendarTodayIcon /></li>
        <li>カレンダー</li>
        <li><ArrowBackIosIcon onClick={() => onPreviousMonthHandler()} /></li>
        <li><ArrowForwardIosIcon onClick={() => onNextMonthHandler()} /></li>
        <li>{yearMonth}</li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    today: state.calendar.today,
    date: state.calendar.date
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchToday: () => dispatch(actions.fetchToday()),
    onPreviousMonth: () => dispatch(actions.setPreviousMonth()),
    onNextMonth: () => dispatch(actions.setNextMonth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
import React, { useEffect, useCallback } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Navbar = props => {

  useEffect(() => {
    props.onFetchToday();
  }, [props.onFetchToday])

  const today = new Date()
  const yearMonth = `${today.getFullYear()}年${today.getMonth() + 1}月`


  const onPreviousMonthHandler = () => {
    props.onPreviousMonth()
  }

  // console.log(props.date)

  return (
    <div className={classes.Navbar}>
      <ul>
        <li><ViewHeadlineIcon /></li>
        <li><CalendarTodayIcon /></li>
        <li>カレンダー</li>
        <li><ArrowBackIosIcon onClick={() => onPreviousMonthHandler()} /></li>
        <li><ArrowForwardIosIcon /></li>
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
    onPreviousMonth: () => dispatch(actions.setPreviousMonth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
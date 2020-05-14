import React, { useState, useEffect } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Navbar = props => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    props.onFetchToday();
  }, [])

  useEffect(() => {
    if (props.date) {
      setSelectedDate(props.date)
    }
  }, [props.date])

  const onPreviousMonthHandler = () => {
    props.onPreviousMonth()
  }

  const onNextMonthHandler = () => {
    props.onNextMonth()
  }

  const CustomInput = ({ onClick }) => (
    <Button className="custom-input" onClick={onClick}>
      {`${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月`}
    </Button>
  );

  return (
    <div className={classes.Navbar}>
      <ul>
        <li><ViewHeadlineIcon /></li>
        <li><CalendarTodayIcon /></li>
        <li>カレンダー</li>
        <li><Button variant="outlined" onClick={() => props.onFetchToday()} >今日</Button></li>
        <li><ArrowBackIosIcon onClick={() => onPreviousMonthHandler()} /></li>
        <li><ArrowForwardIosIcon onClick={() => onNextMonthHandler()} /></li>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          customInput = {<CustomInput />}
        />
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
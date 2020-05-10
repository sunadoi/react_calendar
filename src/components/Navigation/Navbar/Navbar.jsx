import React from 'react';
import classes from './Navbar.module.css';

import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const navbar = props => {
  const today = new Date().getDate()

  return (
    <div className={classes.Navbar}>
      <ul>
        <li><ViewHeadlineIcon /></li>
        <li><CalendarTodayIcon /></li>
        <li>カレンダー</li>
        <li><ArrowBackIosIcon /></li>
        <li><ArrowForwardIosIcon /></li>
        <li>{today}</li>
      </ul>
    </div>
  )
}

export default navbar;
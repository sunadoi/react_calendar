import React from 'react';
import classes from './Navbar.module.css';

import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const navbar = props => {
  const today = new Date();
  const yearMonth = `${today.getFullYear()}年${today.getMonth() + 1}月`

  return (
    <div className={classes.Navbar}>
      <ul>
        <li><ViewHeadlineIcon /></li>
        <li><CalendarTodayIcon /></li>
        <li>カレンダー</li>
        <li><ArrowBackIosIcon /></li>
        <li><ArrowForwardIosIcon /></li>
        <li>{yearMonth}</li>
      </ul>
    </div>
  )
}

export default navbar;
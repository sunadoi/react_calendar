import React from 'react';
import classes from './CalendarBoard.module.css';

import CalendarElement from '../CalendarElement/CalendarElement';

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


  return (
    <div className={classes.CalendarBoard}>
      <ul>{dayOfWeekList}</ul>
      {weeks}
    </div>
  )
}

export default calendarBoard;
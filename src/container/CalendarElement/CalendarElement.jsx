import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import classes from './CalendarElement.module.css';

const calendarElement = props => {
  return (
    <div className={classes.CalendarEl}>
      <h1>1</h1>
      <Schedule />
    </div>
  )
}

export default calendarElement;
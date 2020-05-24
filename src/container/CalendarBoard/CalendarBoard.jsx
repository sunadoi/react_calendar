import React, { useState, useEffect } from 'react';
import classes from './CalendarBoard.module.css';

import CalendarElement from '../CalendarElement/CalendarElement';
import AddSchedule from '../AddSchedule/AddSchedule';
import CurrentSchedule from '../CurrentSchedule/CurrentSchedule';
import UpdateSchedule from '../UpdateSchedule/UpdateSchedule';

import { connect } from 'react-redux';

const CalendarBoard = props => {
  const [dateState, setDateState] = useState([]);

  useEffect(() => {
    if(props.date) {
      const firstDay = new Date(props.date.setDate(1))
      createMonth(firstDay);
    }
  }, [props.date])

  const renderWeekDay = () => {
    const weekDay = [ "日", "月", "火", "水", "木", "金", "土" ]

    return (
      <ul className={classes.WeekDay}>
        {weekDay.map((day, dayIndex) => {
          return <li key={dayIndex}><p>{day}</p></li>
        })}
      </ul>
    );
  };

  const createMonth = date => {
    const month = []

    for (let week=0; week <= 5; week++) {
      let day = new Date(new Date(date).setDate(date.getDate() + (7 * week)))

      const lastDay = new Date(new Date(date.getFullYear(), date.getMonth()+1, 0))
      month.push(createWeek(day))
      if (week === 4 && lastDay.getDay() - day.getDay() >= 0) break; //最終日が第5週目だったらbreak
    }
    setDateState(month)
  }

  const createWeek = date => {
    const baseDay = date.getDay();

    const beforeBaseDay = [];
    for (let beforeDay=0; beforeDay < baseDay; beforeDay++) {
      let diffDayLength = baseDay - beforeDay
      let diffDay = new Date(new Date(date).setDate(date.getDate() - diffDayLength));
      beforeBaseDay.push(diffDay);
    }

    const afterBaseDay = [];
    for (let afterDay=baseDay+1; afterDay <= 6; afterDay++) {
      let diffDayLength = afterDay - baseDay
      let diffDay = new Date(new Date(date).setDate(date.getDate() + diffDayLength));
      afterBaseDay.push(diffDay);
    }

    return [...beforeBaseDay, date, ...afterBaseDay]
  }

  const renderMonth = () => {
    if (!props.date) return;

    return (
      <div className={classes.Month}>
        {dateState.map((week, weekIndex) => {
          return renderWeek(week, weekIndex)
        })}
      </div>
    )
  }

  const renderWeek = (week, weekIndex) => {
    return (
      <div className={classes.Week} key={weekIndex}>
        {week.map((day, dayIndex) => {
          return <CalendarElement day={day} weekLength={dateState.length} key={dayIndex} />
        })}
      </div>
    )
  }

  const renderModal = () => {
    if (!props.showModal) return;

    switch (props.modalType) {
      case 'add': return <AddSchedule />
      case 'current': return <CurrentSchedule />
      case 'update': return <UpdateSchedule />
      default: return null
    }
  }

  return (
    <div className={classes.CalendarBoard}>
      {renderModal()}
      {renderWeekDay()}
      {renderMonth()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showModal: state.modal.showModal,
    modalType: state.modal.modalType,
    date: state.calendar.date
  }
}

export default connect(mapStateToProps)(CalendarBoard);
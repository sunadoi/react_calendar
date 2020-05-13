import React from 'react';
import classes from './CalendarBoard.module.css';

import CalendarElement from '../CalendarElement/CalendarElement';
import AddSchedule from '../AddSchedule/AddSchedule';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const calendarBoard = props => {
  const weekDay = [ "日", "月", "火", "水", "木", "金", "土" ]
  const weekDayList = []
  weekDay.map((day, dayIndex) => {
    weekDayList.push(<li className={classes.weekDay} key={dayIndex}>{day}</li>)
  });


  const today = new Date();
  const firstDay = new Date();
  const first = new Date(firstDay.setDate(1));
  const getsumatsu = new Date(today.getFullYear(), today.getMonth(), 0);
  const last = new Date(getsumatsu.setDate(1))
  // console.log(today);
  // console.log(copytoday);
  // console.log(first);
  // console.log(last);

  const month = []

  const createMonth = date => {
    for (let week=0; week <= 5; week++) {
      let day = new Date(new Date(date).setDate(date.getDate() + (7 * week)))

      const lastDay = new Date(new Date(date.getFullYear(), date.getMonth()+1, 0))
      month.push(createWeek(day))
      if (week === 4 && lastDay.getDay() - day.getDay() >= 0) break; //最終日が第5週目だったらbreak
    }
    return month
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

  const renderMonth = (month) => {
    return (
      <div className={classes.Month}>
        {month.map((week, weekIndex) => {
          return renderWeek(week, weekIndex)
        })}
      </div>
    )
  }

  const renderWeek = (week, weekIndex) => {
    return (
      <div className={classes.Week} key={weekIndex}>
        {week.map((day, dayIndex) => {
          return <CalendarElement date={day} key={dayIndex} />
        })}
      </div>
    )
  }

  const modal = props.showModal ? <AddSchedule  /> : null

  createMonth(first);

  return (
    <div className={classes.CalendarBoard}>
      {modal}
      <ul>{weekDayList}</ul>
      {renderMonth(month)}
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
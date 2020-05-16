import React from 'react';
import { connect } from 'react-redux';

const Schedule = props => {

  const day = `${props.day.getFullYear()}年${props.day.getMonth() + 1}月${props.day.getDate()}日`

  const renderSchedule = () => {
    if (!props.schedules) return;
    const scheduleTitles = props.schedules.map((schedule) => {
      return schedule.date === day ? schedule.title : null
    })

    return (
        scheduleTitles.map((title, index) => {
          return <p key={index}>{title}</p>
        })
    )
  }


  return (
    <div>
      {renderSchedule()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    schedules: state.schedule.schedules
  }
}

export default connect(mapStateToProps)(Schedule);
import React, { Component } from 'react';
import Schedule from '../../components/Schedule/Schedule';
import classes from './CalendarElement.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class CalendarElement extends Component {
  render () {
    const opacity =
      this.props.date.getMonth() === this.props.day.getMonth()
        ? 1
        : 0.5

    const firstDay = `${this.props.day.getMonth()+1}月${this.props.day.getDate()}日`
    const day = this.props.day.getDate() === 1 ? firstDay : this.props.day.getDate()

    return (
      <div
        className={classes.CalendarEl}
        style={{height: `calc(85vh / ${this.props.weekLength})`}}
        onClick={() => this.props.openModal()}
      >
        <p style={{opacity: opacity}}>{day}</p>
        <Schedule day={this.props.day} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    date: state.calendar.date
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(actions.openModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarElement);
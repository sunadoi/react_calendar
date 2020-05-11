import React, { Component } from 'react';
import Schedule from '../../components/Schedule/Schedule';
import classes from './CalendarElement.module.css';

import AddSchedule from '../AddSchedule/AddSchedule';

class CalendarElement extends Component {
  state = {
    showModal: false
  }

  onShowModalHandler = () => {
    this.setState({showModal: true})
  }

  render () {
    const {showModal} = this.state;

    let modal = null;
    if (showModal) {
      modal = <AddSchedule  />
    }

    return (
      <div className={classes.CalendarEl} onClick={this.onShowModalHandler}>
        {modal}
        <h1>1</h1>
        <Schedule />
      </div>
    )
  }
}

export default CalendarElement;
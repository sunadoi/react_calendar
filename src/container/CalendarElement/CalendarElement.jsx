import React, { Component } from 'react';
import Schedule from '../../components/Schedule/Schedule';
import classes from './CalendarElement.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class CalendarElement extends Component {
  render () {
    return (
      <div
        className={classes.CalendarEl}
        style={{height: `calc(85vh / ${this.props.weekLength})`}}
        onClick={() => this.props.openModal()}
      >
        {this.props.date.getDate()}
        <Schedule day={this.props.date} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(actions.openModal())
  }
}

export default connect(null, mapDispatchToProps)(CalendarElement);
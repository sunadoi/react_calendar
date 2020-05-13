import React, { Component } from 'react';

class Schedule extends Component {
  render () {
    return (
      <p>予定</p>
    )
  }
}


//scheduleというreducerを作ってそこで日付と予定を管理する
//this.props.dayとreduxのscheduleの日付が一致すればその予定をrenderする

export default Schedule;
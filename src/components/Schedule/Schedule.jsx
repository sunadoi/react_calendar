import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import * as actions from "../../store/actions/index";
import classes from "./Schedule.module.css";

const Schedule = (props) => {
  const day = `${props.day.getFullYear()}年${
    props.day.getMonth() + 1
  }月${props.day.getDate()}日`;

  const showSchedule = (event, schedule, day, index) => {
    event.stopPropagation();
    props.setSelectedSchedule(day, index);
    props.openCurrentModal(schedule);
  };

  const renderSchedule = () => {
    if (!props.schedules) return;
    const schedules = [];
    props.schedules.map((schedule) => {
      return schedule.date === day ? schedules.push(schedule) : null;
    });

    return schedules.map((schedule, index) => {
      return (
        <div className={classes.Schedule} key={index}>
          <Button
            className={classes.ScheduleBtn}
            style={{
              color: "white",
              fontSize: "12px",
              padding: "2px",
              textTransform: "none",
            }}
            onClick={(event) => showSchedule(event, schedule, day, index)}
          >
            {schedule.title}
          </Button>
        </div>
      );
    });
  };

  return <div>{renderSchedule()}</div>;
};

const mapStateToProps = (state) => {
  return {
    schedules: state.schedule.schedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedSchedule: (day, index) =>
      dispatch(actions.setSelectedSchedule(day, index)),
    openCurrentModal: () => dispatch(actions.openCurrentModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

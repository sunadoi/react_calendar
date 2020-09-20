import React from "react";
import { connect } from "react-redux";
import { Button, Box } from "@material-ui/core";

import * as actions from "../../store/actions/index";
import classes from "./Schedule.module.scss";

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
    Object.keys(props.schedules).map((scheduleKey) => {
      return props.schedules[scheduleKey].date === day
        ? schedules.push(props.schedules[scheduleKey])
        : null;
    });

    const colorList = {
      制限なし: "all",
      プレミアム: "premium",
      スーパープレミアム: "superPremium",
    };

    return schedules.map((schedule, index) => {
      return (
        <Box className={classes[colorList[schedule.plan]]} key={index}>
          <Button
            className={classes.ScheduleBtn}
            style={{
              color: "white",
              fontSize: "12px",
              padding: "2px",
            }}
            onClick={(event) => showSchedule(event, schedule, day, index)}
          >
            {`${schedule.startTime} ${schedule.title}`}
          </Button>
        </Box>
      );
    });
  };

  return <>{renderSchedule()}</>;
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

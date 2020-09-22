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

    return schedules.map((schedule, index) => {
      let circle;
      switch (schedule.plan) {
        case "all":
          circle = <p style={{ marginTop: "0", marginRight: "4px" }}>🔵</p>;
          break;
        case "premium":
          circle = <p style={{ marginTop: "0", marginRight: "4px" }}>🟢</p>;
          break;
        case "superPremium":
          circle = <p style={{ marginTop: "0", marginRight: "4px" }}>🔴</p>;
          break;
      }

      return (
        <Box key={index}>
          {schedule.plan === "holiday" ? (
            <Button
              style={{
                width: "100%",
                backgroundColor: "green",
                color: "white",
                padding: "2px",
                marginTop: "4px",
                fontSize: "12px",
              }}
              onClick={(event) => showSchedule(event, schedule, day, index)}
            >
              {schedule.title}
            </Button>
          ) : (
            <Button
              className={classes.ScheduleBtn}
              style={{ padding: "4px 8px" }}
              onClick={(event) => showSchedule(event, schedule, day, index)}
            >
              {circle}
              <p
                style={{ margin: "0", fontSize: "12px" }}
              >{`${schedule.startTime} ${schedule.title}`}</p>
            </Button>
          )}
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

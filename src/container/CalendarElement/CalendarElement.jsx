import React from "react";
import Schedule from "../../components/Schedule/Schedule";
import classes from "./CalendarElement.module.scss";
import { Box } from "@material-ui/core";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const CalendarElement = (props) => {
  const onClickHandler = (day) => {
    props.setSelectedDay(day);
    props.openAddModal();
  };

  const opacity = props.date.getMonth() === props.day.getMonth() ? 1 : 0.5;

  const isToday =
    props.day.getFullYear() === new Date().getFullYear() &&
    props.day.getMonth() === new Date().getMonth() &&
    props.day.getDate() === new Date().getDate();

  const firstDay = `${props.day.getMonth() + 1}月${props.day.getDate()}日`;
  const day =
    props.day.getDate() === 1 && !isToday ? firstDay : props.day.getDate();

  let dayColor;
  if (props.weekDay % 7 === 6 && !isToday) {
    dayColor = "blue";
  } else if (props.weekDay % 7 === 0 && !isToday) {
    dayColor = "red";
  }

  return (
    <div
      className={classes.CalendarEl}
      style={{ height: `calc(86vh / ${props.weekLength})` }}
      onClick={() => onClickHandler(props.day)}
    >
      <Box display="flex" justifyContent="center">
        <p
          className={isToday ? classes.today : classes.notToday}
          style={{ opacity: opacity, color: dayColor }}
        >
          {day}
        </p>
      </Box>
      <Schedule day={props.day} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    date: state.calendar.date,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDay: (day) => dispatch(actions.setSelectedDay(day)),
    openAddModal: () => dispatch(actions.openAddModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarElement);

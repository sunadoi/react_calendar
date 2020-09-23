import React, { useState, useEffect } from "react";
import { Plan } from "../../../models/Plan";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { Button, Box } from "@material-ui/core";
import "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Logo from "../../../logo.jpg";

const Navbar = (props) => {
  const [dateState, setDateState] = useState(props.date);
  const [displayDate, setDisplayDate] = useState(props.date);

  useEffect(() => {
    props.onFetchToday();
  }, []);

  useEffect(() => {
    if (props.date) {
      setDateState(props.date);

      const year = props.date.getFullYear();
      const month = props.date.getMonth() + 1;
      setDisplayDate(`${year}年${month}月`);
    }
  }, [props.date]);

  const onPreviousMonthHandler = () => {
    props.onPreviousMonth();
  };

  const onNextMonthHandler = () => {
    props.onNextMonth();
  };

  return (
    <div className={classes.Navbar}>
      <Box display="flex" justifyContent="space-between">
        <ul>
          <li>
            <img src={Logo} style={{ width: "60px" }} alt="転クエLogo" />
          </li>
          <li>転クエカレンダー</li>
          <li>
            <Button variant="outlined" onClick={() => props.onFetchToday()}>
              今日
            </Button>
          </li>
          <li style={{ margin: "0" }}>
            <Button
              style={{ maxWidth: "80%", padding: "8px 0" }}
              onClick={() => onPreviousMonthHandler()}
            >
              <ArrowBackIosIcon style={{ width: "16px" }} />
            </Button>
          </li>
          <li style={{ margin: "0" }}>
            <Button
              style={{ maxWidth: "80%", padding: "8px 0" }}
              onClick={() => onNextMonthHandler()}
            >
              <ArrowForwardIosIcon style={{ width: "16px" }} />
            </Button>
          </li>
          <li>
            <p style={{ fontSize: "20px" }}>{displayDate}</p>
          </li>
        </ul>
        <ul>
          <li>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p style={{ marginTop: "0", marginRight: "4px" }}>🔵</p>
              {/* <LabelIcon className={classes.AllIcon} /> */}
              <div>{Plan.all}</div>
            </Box>
          </li>
          <li>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p style={{ marginTop: "0", marginRight: "4px" }}>🟢</p>
              {/* <LabelIcon className={classes.PremiumIcon} /> */}
              <div>{Plan.premium}</div>
            </Box>
          </li>
          <li>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <p style={{ marginTop: "0", marginRight: "4px" }}>🔴</p>
              {/* <LabelIcon className={classes.SuperPremiumIcon} /> */}
              <div>{Plan.superPremium}</div>
            </Box>
          </li>
        </ul>
      </Box>
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
    onFetchToday: () => dispatch(actions.fetchToday()),
    onPreviousMonth: () => dispatch(actions.setPreviousMonth()),
    onNextMonth: () => dispatch(actions.setNextMonth()),
    onSelectedDate: (date) => dispatch(actions.setSelectedDate(date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

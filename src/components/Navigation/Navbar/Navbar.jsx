import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import "date-fns";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import Logo from "../../../logo.jpg";

const Navbar = (props) => {
  const [dateState, setDateState] = useState(props.date);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    props.onFetchToday();
  }, []);

  useEffect(() => {
    if (props.date) {
      setDateState(props.date);
    }
  }, [props.date]);

  const onPreviousMonthHandler = () => {
    props.onPreviousMonth();
  };

  const onNextMonthHandler = () => {
    props.onNextMonth();
  };

  const onSelectedDateHandler = (date) => {
    setSelectedDate(date);
    props.onSelectedDate(date);
  };

  const CustomInput = ({ onClick }) => {
    if (!dateState) return new Date().getDate();

    return (
      <Button className="custom-input" onClick={onClick}>
        {`${dateState.getFullYear()}年${dateState.getMonth() + 1}月`}
      </Button>
    );
  };

  const jaLocale = {
    ...ja,
    options: {
      weekStartsOn: 0,
    },
  };

  registerLocale("ja", jaLocale);

  return (
    <div className={classes.Navbar}>
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
        <DatePicker
          selected={selectedDate}
          onChange={(date) => onSelectedDateHandler(date)}
          customInput={<CustomInput />}
          locale="ja"
          dateFormat="yyyy/MM/dd"
        />
      </ul>
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

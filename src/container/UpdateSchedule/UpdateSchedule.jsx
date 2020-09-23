import React, { useState, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import TitleIcon from "@material-ui/icons/Title";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import SubjectIcon from "@material-ui/icons/Subject";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

import Modal from "../../components/UI/Modal/Modal";
import StyeledDatePicker from "../../components/UI/DatePicker/DatePicker";
import classes from "./UpdateSchedule.module.scss";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const UpdateSchedule = (props) => {
  const [schedule, setSchedule] = useState({
    title: "",
    date: new Date(),
    startTime: "21:00",
    endTime: "22:00",
    plan: "all",
    description: "",
    owner: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");

  const timeList = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  useEffect(() => {
    const selectedDate = props.selectedSchedule.date
      .replace("年", "/")
      .replace("月", "/")
      .replace("日", "");
    setSelectedDate(new Date(selectedDate));
    setSchedule({ ...props.selectedSchedule });
  }, []);

  const dateChangeHandler = (date) => {
    setSelectedDate(date);

    const scheduleDate = `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日`;
    setSchedule({ ...schedule, date: scheduleDate });
  };

  const onChangeHandler = (event, scheduleName) => {
    setSchedule({ ...schedule, [scheduleName]: event.target.value });
  };

  const onCloseHandler = () => {
    props.closeModal();
  };

  const onSubmitHandler = () => {
    if (!schedule.title && !schedule.owner) {
      setError("タイトルと主催者を入力してください");

      return;
    }

    if (!schedule.title) {
      setError("タイトルを入力してください");

      return;
    }

    if (!schedule.owner) {
      setError("主催者を入力してください");

      return;
    }

    props.updateSchedule(schedule);
    props.closeModal();
  };

  const dialogContent = (
    <DialogContent>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box display="flex" width="95%" className={classes.ScheduleItem}>
        <TitleIcon className={classes.Icon} />
        <TextField
          autoFocus
          fullWidth
          placeholder="タイトルを追加"
          margin="dense"
          size="medium"
          name="title"
          value={schedule.title}
          onChange={(event) => onChangeHandler(event, "title")}
        />
      </Box>
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <CalendarTodayIcon className={classes.Icon} />
        <StyeledDatePicker
          selectedDate={selectedDate}
          dateChangeHandler={dateChangeHandler}
        />
      </Box>
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <AccessTimeIcon className={classes.Icon} />
        <div>
          <InputLabel style={{ fontSize: "12px" }}>開始時間</InputLabel>
          <Select
            value={schedule.startTime}
            style={{ width: "120px", marginRight: "32px" }}
            onChange={(event) => onChangeHandler(event, "startTime")}
          >
            {timeList.map((time) => {
              return (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <InputLabel style={{ fontSize: "12px" }}>終了時間</InputLabel>
          <Select
            value={schedule.endTime}
            style={{ width: "120px" }}
            onChange={(event) => onChangeHandler(event, "endTime")}
          >
            {timeList.map((time) => {
              return (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </Box>
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <PeopleAltOutlinedIcon className={classes.Icon} />
        <TextField
          placeholder="主催者を追加"
          margin="dense"
          size="medium"
          name="owner"
          value={schedule.owner}
          onChange={(event) => onChangeHandler(event, "owner")}
        />
      </Box>
      <Box display="flex" width="95%" className={classes.ScheduleItem}>
        <SubjectIcon className={classes.Icon} />
        <TextField
          placeholder="説明を追加"
          multiline
          fullWidth
          margin="dense"
          size="medium"
          name="description"
          value={schedule.description}
          onChange={(event) => onChangeHandler(event, "description")}
        />
      </Box>
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <LabelOutlinedIcon className={classes.Icon} />
        <Select
          value={schedule.plan}
          style={{ width: "200px" }}
          onChange={(event) => onChangeHandler(event, "plan")}
        >
          <MenuItem value="all">全員参加可</MenuItem>
          <MenuItem value="premium">プレミアム以上限定</MenuItem>
          <MenuItem value="superPremium">スーパープレミアム限定</MenuItem>
        </Select>
      </Box>
    </DialogContent>
  );

  return (
    <Modal>
      <form className={classes.UpdateSchedule}>
        {dialogContent}
        <DialogActions style={{ marginRight: "32px" }}>
          <Button
            onClick={() => onSubmitHandler()}
            variant="contained"
            color="primary"
          >
            変更
          </Button>
          <Button onClick={() => onCloseHandler()} variant="contained">
            戻る
          </Button>
        </DialogActions>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedSchedule: state.schedule.selectedSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    updateSchedule: (schedule) => dispatch(actions.updateSchedule(schedule)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSchedule);

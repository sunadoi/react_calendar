import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  DialogActions,
  DialogContent,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import SubjectIcon from "@material-ui/icons/Subject";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

import Modal from "../../components/UI/Modal/Modal";
import StyeledDatePicker from "../../components/UI/DatePicker/DatePicker";
import { formatDate } from "../../helpers/formatDate";
import classes from "./AddSchedule.module.scss";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const AddSchedule = (props) => {
  const [schedule, setSchedule] = useState({
    title: "",
    date: new Date(),
    repeat: 0,
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

  const repeatCount = [0, 1, 2, 3, 4];

  useEffect(() => {
    const date = formatDate(props.selectedDay);
    setSchedule({ ...schedule, date: date });
    setSelectedDate(props.selectedDay);
  }, []);

  const onChangeHandler = (event, scheduleName) => {
    setSchedule({ ...schedule, [scheduleName]: event.target.value });
  };

  const dateChangeHandler = (date) => {
    setSelectedDate(date);

    const scheduleDate = `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日`;
    setSchedule({ ...schedule, date: scheduleDate });
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

    props.addSchedule(schedule, selectedDate);
    props.closeModal();
  };

  const dialogContent = (
    <DialogContent>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box display="flex" width="90%" className={classes.ScheduleItem}>
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
      <Box display="flex" width="100%" className={classes.ScheduleItem}>
        <CalendarTodayIcon className={classes.Icon} />
        <StyeledDatePicker
          selectedDate={selectedDate}
          dateChangeHandler={dateChangeHandler}
        />
        <Box display="flex" alignItems="center" style={{ marginLeft: "40px" }}>
          <p>繰り返し: </p>
          <Select
            value={schedule.repeat}
            style={{ width: "80px", marginLeft: "8px", paddingTop: "4px" }}
            onChange={(event) => onChangeHandler(event, "repeat")}
          >
            {repeatCount.map((count) => {
              return (
                <MenuItem key={count} value={count}>
                  {count === 0 ? "しない" : `${count}回`}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
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
      <Box display="flex" width="90%" className={classes.ScheduleItem}>
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
      <form className={classes.AddSchedule}>
        {dialogContent}
        <DialogActions>
          <Button onClick={() => props.closeModal()} color="primary">
            戻る
          </Button>
          <Button onClick={() => onSubmitHandler()} color="primary">
            保存
          </Button>
        </DialogActions>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDay: state.calendar.selectedDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    addSchedule: (schedule, selectedDate) =>
      dispatch(actions.addSchedule(schedule, selectedDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSchedule);

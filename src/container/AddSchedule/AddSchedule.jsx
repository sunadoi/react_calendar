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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import SubjectIcon from "@material-ui/icons/Subject";

import Modal from "../../components/UI/Modal/Modal";
import classes from "./AddSchedule.module.scss";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const AddSchedule = (props) => {
  const [schedule, setSchedule] = useState({
    title: "",
    date: null,
    startTime: "21:00",
    endTime: "22:00",
    plan: "誰でも",
    description: "",
  });

  const timeList = [
    "0:00",
    "0:30",
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30",
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
    const date = `${props.selectedDay.getFullYear()}年${
      props.selectedDay.getMonth() + 1
    }月${props.selectedDay.getDate()}日`;
    setSchedule({ ...schedule, date: date });
  }, []);

  const onChangeHandler = (event, scheduleName) => {
    setSchedule({ ...schedule, [scheduleName]: event.target.value });
  };

  const changeStartTimeHandler = (event) => {
    setSchedule({ ...schedule, startTime: event.target.value });
  };

  const changeEndTimeHandler = (event) => {
    setSchedule({ ...schedule, endTime: event.target.value });
  };

  const changePlanHandler = (event) => {
    setSchedule({ ...schedule, plan: event.target.value });
  };

  const onSubmitHandler = () => {
    props.addSchedule(schedule);
    props.closeModal();
  };

  const dialogContent = (
    <DialogContent>
      <TextField
        autoFocus
        placeholder="タイトルを追加"
        margin="dense"
        fullWidth
        size="medium"
        name="title"
        value={schedule.title}
        onChange={(event) => onChangeHandler(event, "title")}
      />
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <CalendarTodayIcon className={classes.Icon} />
        <TextField
          placeholder="日付を追加"
          margin="dense"
          size="medium"
          name="date"
          value={schedule.date}
          onChange={(event) => onChangeHandler(event, "date")}
        />
      </Box>
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <AccessTimeIcon className={classes.Icon} />
        <div>
          <InputLabel>開始時間</InputLabel>
          <Select
            value={schedule.startTime}
            style={{ width: "120px", marginRight: "32px" }}
            onChange={changeStartTimeHandler}
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
          <InputLabel>終了時間</InputLabel>
          <Select
            value={schedule.endTime}
            style={{ width: "120px" }}
            onChange={changeEndTimeHandler}
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
        <LabelOutlinedIcon className={classes.Icon} />
        <Select
          value={schedule.plan}
          style={{ width: "200px" }}
          onChange={changePlanHandler}
        >
          <MenuItem value="誰でも">誰でも</MenuItem>
          <MenuItem value="プレミアム">プレミアム以上限定</MenuItem>
          <MenuItem value="スーパープレミアム">スーパープレミアム限定</MenuItem>
        </Select>
      </Box>
      <Box display="flex" width="80%" className={classes.ScheduleItem}>
        <SubjectIcon className={classes.Icon} />
        <TextField
          placeholder="説明を追加"
          margin="dense"
          size="medium"
          name="description"
          value={schedule.description}
          onChange={(event) => onChangeHandler(event, "description")}
        />
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
    addSchedule: (schedule) => dispatch(actions.addSchedule(schedule)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSchedule);

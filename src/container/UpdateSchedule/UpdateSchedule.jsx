import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PlaceIcon from "@material-ui/icons/Place";
import SubjectIcon from "@material-ui/icons/Subject";

import Modal from "../../components/UI/Modal/Modal";
import classes from "./UpdateSchedule.module.scss";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const UpdateSchedule = (props) => {
  const [schedule, setSchedule] = useState({
    title: "",
    date: null,
    place: "",
    description: "",
  });

  useEffect(() => {
    const { title, place, description } = props.selectedSchedule;
    const date = `${props.selectedDay.getFullYear()}年${
      props.selectedDay.getMonth() + 1
    }月${props.selectedDay.getDate()}日`;
    setSchedule({ ...schedule, title, date, place, description });
  }, []);

  const onChangeHandler = (event, scheduleName) => {
    setSchedule({ ...schedule, [scheduleName]: event.target.value });
  };

  const onCloseHandler = () => {
    props.closeModal();
  };

  const onSubmitHandler = () => {
    props.updateSchedule(schedule);
    props.closeModal();
  };

  const dialogContent = (
    <DialogContent>
      <TextField
        autoFocus
        placeholder="タイトルと日時を追加"
        margin="dense"
        fullWidth
        size="medium"
        name="title"
        value={schedule.title}
        onChange={(event) => onChangeHandler(event, "title")}
      />
      <div>
        <AccessTimeIcon />
        <TextField
          placeholder="日時を追加"
          margin="dense"
          size="medium"
          name="date"
          value={schedule.date}
          onChange={(event) => onChangeHandler(event, "date")}
        />
      </div>
      <div>
        <PlaceIcon />
        <TextField
          placeholder="場所を追加"
          margin="dense"
          size="medium"
          name="place"
          value={schedule.place}
          onChange={(event) => onChangeHandler(event, "place")}
        />
      </div>
      <div>
        <SubjectIcon />
        <TextField
          placeholder="説明を追加"
          margin="dense"
          size="medium"
          name="description"
          value={schedule.description}
          onChange={(event) => onChangeHandler(event, "description")}
        />
      </div>
    </DialogContent>
  );

  return (
    <Modal>
      <form className={classes.UpdateSchedule}>
        {dialogContent}
        <DialogActions>
          <Button onClick={() => onCloseHandler()} color="primary">
            戻る
          </Button>
          <Button onClick={() => onSubmitHandler()} color="primary">
            変更
          </Button>
        </DialogActions>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDay: state.calendar.selectedDay,
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

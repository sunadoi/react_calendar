import React from "react";
import { Button, Box } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import SubjectIcon from "@material-ui/icons/Subject";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

import Modal from "../../components/UI/Modal/Modal";
import classes from "./CurrentSchedule.module.scss";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const CurrentSchedule = (props) => {
  const dialogContent = (
    <DialogContent>
      <div className={classes.content}>
        <p className={classes.title}>{props.selectedSchedule.title}</p>
        <Box
          display="flex"
          justifyContent="space-between"
          width="70%"
          className={classes.dateTime}
        >
          <p>{props.selectedSchedule.date}</p>
          <p>
            {`${props.selectedSchedule.startTime} ~ ${props.selectedSchedule.endTime}`}
          </p>
        </Box>
      </div>
      {props.selectedSchedule.description && (
        <div className={classes.information}>
          <SubjectIcon />
          <p>{props.selectedSchedule.description}</p>
        </div>
      )}
    </DialogContent>
  );

  const onEditSchedule = () => {
    props.closeModal();
    props.openUpdateModal();
  };

  const onDeleteSchedule = () => {
    props.closeModal();
    props.removeSchedule(props.selectedSchedule.id);
  };

  return (
    <Modal>
      <DialogActions>
        {/* とりあえず編集と削除は非表示にする */}
        {/* <Button onClick={() => onEditSchedule()} color="primary">
          <EditIcon />
        </Button>
        <Button onClick={() => onDeleteSchedule()} color="primary">
          <DeleteIcon />
        </Button> */}
        <Button onClick={() => props.closeModal()} color="primary">
          <CloseIcon />
        </Button>
      </DialogActions>
      <div className={classes.CurrentSchedule}>{dialogContent}</div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    date: state.calendar.date,
    schedule: state.schedule.schedules,
    selectedSchedule: state.schedule.selectedSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(actions.closeModal()),
    openUpdateModal: () => dispatch(actions.openUpdateModal()),
    removeSchedule: (id) => dispatch(actions.removeSchedule(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSchedule);

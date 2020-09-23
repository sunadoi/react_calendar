import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import SubjectIcon from "@material-ui/icons/Subject";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

import Modal from "../../components/UI/Modal/Modal";
import { Plan, returnCircle } from "../../models/Plan";
import classes from "./CurrentSchedule.module.scss";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const CurrentSchedule = (props) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteConfirmContent = (
    <DialogContent>
      <p style={{ fontSize: "24px", marginBottom: "24px" }}>
        この予定を削除しますか？
      </p>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          style={{ marginRight: "16px" }}
          onClick={() => onDeleteSchedule()}
        >
          はい
        </Button>
        <Button variant="contained" onClick={() => setDeleteConfirm(false)}>
          キャンセル
        </Button>
      </Box>
    </DialogContent>
  );

  const circle = returnCircle(props.selectedSchedule.plan);

  const dialogContent = (
    <DialogContent>
      <div className={classes.content}>
        <p
          className={classes.title}
        >{`${circle} ${props.selectedSchedule.title}`}</p>
        {props.selectedSchedule.plan !== "holiday" && (
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
        )}
      </div>
      {props.selectedSchedule.owner && (
        <Box display="flex" alignItems="center" className={classes.owner}>
          <PeopleAltOutlinedIcon style={{ marginRight: "8px" }} />
          <p>{props.selectedSchedule.owner}</p>
        </Box>
      )}
      {props.selectedSchedule.description && (
        <Box display="flex" alignItems="center" className={classes.information}>
          <SubjectIcon style={{ marginRight: "8px" }} />
          <p>{props.selectedSchedule.description}</p>
        </Box>
      )}
      <Box display="flex" alignItems="center" className={classes.plan}>
        <LabelOutlinedIcon style={{ marginRight: "8px" }} />
        <p>{Plan[props.selectedSchedule.plan]}</p>
      </Box>
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
      <DialogActions style={{ marginTop: "16px" }}>
        <Button onClick={() => onEditSchedule()} color="primary">
          <EditIcon />
        </Button>
        <Button onClick={() => setDeleteConfirm(true)} color="primary">
          <DeleteIcon />
        </Button>
        <Button onClick={() => props.closeModal()} color="primary">
          <CloseIcon />
        </Button>
      </DialogActions>
      {deleteConfirm ? (
        <div className={classes.CurrentSchedule}>{deleteConfirmContent}</div>
      ) : (
        <div className={classes.CurrentSchedule}>{dialogContent}</div>
      )}
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

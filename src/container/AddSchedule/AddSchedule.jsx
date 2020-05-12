import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import SubjectIcon from '@material-ui/icons/Subject';

import Modal from '../../components/UI/Modal/Modal';
import classes from './AddSchedule.module.css';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class AddSchedule extends Component {
  render() {
    const dialogContent = (
      <DialogContent>
        <TextField
          autoFocus
          placeholder="タイトルと日時を追加"
          margin="dense"
          fullWidth
          size='medium'
          name='title'
        />
        <div>
          <AccessTimeIcon />
          <TextField
            placeholder="日時を追加"
            margin="dense"
            size='medium'
            name='date'
          />
        </div>
        <div>
          <PlaceIcon />
          <TextField
            placeholder="場所を追加"
            margin="dense"
            size='medium'
            name='place'
          />
        </div>
        <div>
          <SubjectIcon />
          <TextField
            placeholder="説明を追加"
            margin="dense"
            size='medium'
            name='description'
          />
        </div>
      </DialogContent>
    )

    return (
      <Modal>
        <div className={classes.AddSchedule}>
          {dialogContent}
          <DialogActions>
            <Button onClick={() => this.props.closeModal()} color="primary">戻る</Button>
            <Button onClick={() => this.props.closeModal()} color="primary">保存</Button>
          </DialogActions>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.closeModal())
  }
}

export default connect(null, mapDispatchToProps)(AddSchedule);
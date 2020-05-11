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

class AddSchedule extends Component {
  state = {
    close: false
  }
  
  handleClose = () => {
    this.setState({close: true});
  };

  render() {
    const dialogContent = (
      <DialogContent>
        <TextField
          autoFocus
          placeholder="タイトルと日時を追加"
          margin="dense"
          fullWidth
          size='medium'
        />
        <div>
          <AccessTimeIcon />
          <TextField
            placeholder="日時を追加"
            margin="dense"
            size='medium'
          />
        </div>
        <div>
          <PlaceIcon />
          <TextField
            placeholder="場所を追加"
            margin="dense"
            size='medium'
          />
        </div>
        <div>
          <SubjectIcon />
          <TextField
            placeholder="説明を追加"
            margin="dense"
            size='medium'
          />
        </div>
      </DialogContent>
    )

    return (
      <Modal close={this.state.close}>
        <div className={classes.AddSchedule}>
          {dialogContent}
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </div>
      </Modal>
    )
  }
}

export default AddSchedule;
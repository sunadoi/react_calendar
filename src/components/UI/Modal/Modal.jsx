import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import classes from './Modal.module.css';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Modal = (props) => {
  return (
    <div>
      <Dialog
        open={props.showModal}
        onClose={() => props.closeModal()}
        aria-labelledby="form-dialog-title"
        className={classes.Modal}
      >
        {props.children}
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    showModal: state.modal.showModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';

import classes from './Modal.module.css';

const Modal = (props) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (props.close) {
      setOpen(false);
    }
  }, [props.close])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.Modal}
      >
        {props.children}
      </Dialog>
    </div>
  );
}

export default Modal;
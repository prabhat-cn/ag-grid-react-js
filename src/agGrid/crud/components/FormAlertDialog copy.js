import * as React from 'react';
import {
  Button,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
} from '@material-ui/core';

export const FormAlertDialog = ({
  open,
  handleClose,
  handleClickOpen,
  formData,
  onChange,
  handleFormSubmit: any,
}) => {
  const { name, email, phone } = formData;

  const handleFormSubmit = () => {
    console.log(formData);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Create new user'}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="name"
              value={name}
              onChange={(e) => onChange(e)}
              placeholder="Enter name.."
              label="Name"
              fullWidth
              // variant="outlined"
              margin="dense"
            />
            <TextField
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder="Enter email.."
              label="Email"
              fullWidth
              // variant="outlined"
              margin="dense"
            />
            <TextField
              id="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              placeholder="Enter phone.."
              label="Phone"
              fullWidth
              // variant="outlined"
              margin="dense"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            // onClick={() => {
            //   console.log(formData);
            // }}
            onClick={() => {
              handleFormSubmit();
            }}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

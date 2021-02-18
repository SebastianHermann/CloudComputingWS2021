import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  TextField: {
    padding: '10px 0px',
    minWidth: '500px',
  },
});

export default function ToDoForm(props) {
  const classes = useStyles();
  const [createMode, setCreateMode] = useState(props.createMode);

  const [note, setNote] = useState(props.note);
  const [validate, setValidate] = useState(false);

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    validator();
  }, [note]);

  const handleClose = () => {
    setNote(props.note);
    props.handleClose();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/notes/${note._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    }).then(() => props.handleDelete());
  };

  const validator = () => {
    if (note.title == '' || note.description == '' || note.category == '') {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  const handleSave = async () => {
    if (note.title == null) {
      setNote({ ...note, title: '' });
    }
    if (note.description == null) {
      setNote({ ...note, description: '' });
    }
    if (note.category == null) {
      setNote({ ...note, category: '' });
    }
    if (note.dueDate == null) {
      setNote({ ...note, dueDate: '' });
    }

    !note._id
      ? await fetch('/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...note, status: 'open' }),
        })
          .then(setNote(props.note))
          .then(() => props.handleSave())
      : await fetch(`/notes/${note._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...note, status: 'open' }),
        }).then(() => props.handleSave());
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogContextText}</DialogContentText>

          <div className={classes.TextField}>
            <TextField
              id="outlined-basic"
              name="title"
              label="Title"
              variant="outlined"
              defaultValue={note ? note.title : ''}
              fullWidth
              onChange={(event) => handleChange(event)}
              required
            />
          </div>
          <div className={classes.TextField}>
            <TextField
              id="outlined-multiline-static"
              name="description"
              label="Description"
              multiline
              rows={4}
              defaultValue={note ? note.description : ''}
              variant="outlined"
              fullWidth
              onChange={(event) => handleChange(event)}
              required
            />
          </div>

          <div className={classes.TextField}>
            <TextField
              id="outlined-multiline-static"
              name="category"
              label="Category"
              multiline
              rows={1}
              defaultValue={note ? note.category : ''}
              variant="outlined"
              fullWidth
              onChange={(event) => handleChange(event)}
              required
            />
          </div>
          <div className={classes.TextField}>
            <TextField
              id="datetime-local"
              name="dueDate"
              label="Due Date"
              type="datetime-local"
              // defaultValue="2017-05-24T10:30"
              // className={classes.textField}
              // helperText="(optional)",
              defaultValue={note ? note.dueDate : ''}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
              onChange={(event) => handleChange(event)}
              // required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" disabled={!validate}>
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={createMode} onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

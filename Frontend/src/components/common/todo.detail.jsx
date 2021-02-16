import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ToDoForm from '../common/todo.form';
import Confetti from 'react-dom-confetti';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  cardContent: {
    height: 80,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const confettiConfig = {
  angle: '90',
  spread: '88',
  startVelocity: '38',
  elementCount: '130',
  dragFriction: 0.12,
  duration: '1020',
  stagger: '0',
  width: '8px',
  height: '8px',
  perspective: '852px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export default function ToDoDetail(props) {
  const classes = useStyles();
  const [note, setNote] = useState(props.note);
  const [open, setOpen] = useState(props.open);
  const [doneEffect, setDoneEffect] = useState(false);

  const handleSave = (note) => {
    setNote(note);
    setOpen(false);
  };

  const handleClose = () => {
    // setNote(note);
    setOpen(false);
  };

  const handleDone = () => {
    setDoneEffect(true);
    setTimeout(() => {
      setNote({ ...note, status: 'done', solvedOn: Date.now });
      setDoneEffect(false);
    }, 800);
  };

  const handleReOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/notes/${note._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  }, [note.status]);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {note.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {note.category}
        </Typography>
        <Typography variant="body2" component="p">
          {note.description}
        </Typography>
        <Typography variant="body2" component="p">
          {note.dueDate}
        </Typography>
        <Typography variant="body2" component="p">
          {note.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={note.status === 'open' ? handleDone : handleReOpen}
        >
          {note.status === 'open' ? 'Done' : 'Re-Open'}
        </Button>
        <Confetti active={doneEffect} config={confettiConfig} />
        <Button
          size="small"
          onClick={() => setOpen(true)}
          disabled={note.status === 'open' ? false : true}
        >
          Edit
        </Button>
        <ToDoForm
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          // handleDelete={handleDelete}
          note={note}
          dialogTitle={note.status === 'open' ? 'Edit Note' : 'Re-Open Note'}
          dialogContextText="Make adjustments to your note."
          createMode={false}
        ></ToDoForm>
      </CardActions>
    </Card>
  );
}

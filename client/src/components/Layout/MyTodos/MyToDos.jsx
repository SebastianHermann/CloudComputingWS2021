import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import MyToDosList from './MyToDos.list';
import ToDoForm from '../../common/todo.form';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  notesViewPanel: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  searchPanel: {},
  createPanel: {
    alignSelf: 'center',
  },
  titlePanel: {},
  subTitlePanel: {},
  filterPanel: {},
  sortPanel: {},
  notesPanel: {},
}));

export default function MyToDos(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (event) => {
    console.log('search: ', event.target.value);
    setSearchText(event.target.value);
  };

  const loadData = async () => {
    setLoading(true);
    const response = await fetch(`/notes/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ creator: props.user.googleId }),
    });
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const defaultNote = {
    title: '',
    description: '',
    category: '',
    dueDate: '',
    creator: props.user.googleId,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    handleReload();
  };

  const handleReload = async () => {
    await loadData();
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.notesViewPanel}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className={classes.searchPanel}>
                  <Grid container spacing={1} alignItems="flex-end">
                    {/* <Grid item>
                      <SearchIcon />
                    </Grid> */}
                    <Grid item>
                      {/* <TextField
                        id="input-with-icon-grid"
                        placeholder="A project by business informatics students at Stuttgart Media University."
                        onChange={(event) => handleSearchChange(event)}
                      /> */}
                      <Typography variant="subtitle1">
                        A Cloud Computing Project @
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.hdm-stuttgart.de/wib"
                        >
                          HdM Stuttgart
                        </a>
                        .
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.notesViewPanel}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className={classes.titlePanel}>
                  <Typography variant="h3">My To-Do's</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.createPanel}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClick}
                  >
                    Create
                  </Button>
                  <ToDoForm
                    open={open}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    note={defaultNote}
                    dialogTitle="Create Note"
                    dialogContextText="Create a new To-Do and add it to your To-Do list."
                    createMode={true}
                  ></ToDoForm>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.subTitlePanel}>
                  <Typography variant="subtitle1">
                    Hi {props.user.givenName}, there is work waiting for you.
                    What are you waiting for? Roll up your sleeves and get to
                    work.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            className={classes.notesViewPanel}
            style={{ overflowY: 'auto', height: '60vh' }}
          >
            <Grid container spacing={2}>
              <MyToDosList
                loading={loading}
                user={props.user}
                data={data}
                handleReload={handleReload}
              ></MyToDosList>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

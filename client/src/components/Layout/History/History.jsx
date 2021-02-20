import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import HistoryList from './History.list';

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

export default function History(props) {
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
                        A project by business informatics students @HdM
                        Stuttgart.
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
              <Grid item xs={12}>
                <div className={classes.titlePanel}>
                  <Typography variant="h3">History</Typography>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.subTitlePanel}>
                  <Typography variant="subtitle1">
                    Here you can find all the to-dos that you have already
                    completed.
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
              <HistoryList
                loading={loading}
                user={props.user}
                data={data}
                handleReload={handleReload}
              ></HistoryList>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

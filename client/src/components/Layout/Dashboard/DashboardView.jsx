import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Notizliste from '..//Notizliste';
import NoteForm from '../../common/note.form';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries as BarSeries,
  VerticalBarSeriesCanvas,
} from 'react-vis';
// import openClosedBoard from './openClosed.board';

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

const defaultNote = { title: '', description: '', category: '' };

export default function DashboardView() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };
  //   const data = [
  //     { x: 0, y: 8 },
  //     { x: 1, y: 5 },
  //     { x: 2, y: 4 },
  //     { x: 3, y: 9 },
  //     { x: 4, y: 1 },
  //     { x: 5, y: 7 },
  //     { x: 6, y: 6 },
  //     { x: 7, y: 3 },
  //     { x: 8, y: 2 },
  //     { x: 9, y: 0 },
  //   ];
  const graph = (
    <XYPlot width={500} height={300} stackBy="y">
      {/* <VerticalGridLines /> */}
      {/* <HorizontalGridLines /> */}
      <XAxis />
      {/* <YAxis /> */}
      <BarSeries
        data={[
          { x: 2, y: 10 },
          { x: 4, y: 5 },
          { x: 5, y: 15 },
        ]}
      />
      <BarSeries
        data={[
          { x: 2, y: 12 },
          { x: 4, y: 2 },
          { x: 5, y: 11 },
        ]}
      />
    </XYPlot>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.notesViewPanel}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className={classes.searchPanel}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        // label="With a grid"
                        placeholder="Search..."
                      />
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
                  <Typography variant="h3">
                    Dashboard
                    {/* <span>👋</span> */}
                  </Typography>
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
                  <NoteForm
                    open={open}
                    handleClose={handleClose}
                    note={defaultNote}
                    dialogTitle="Create Note"
                    dialogContextText="Create a new To-Do and add it to your To-Do list."
                    createMode={true}
                  ></NoteForm>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.subTitlePanel}>
                  <Typography variant="subtitle1">
                    Here you can see all your to-dos that are either still open
                    or already done.
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
              {graph}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

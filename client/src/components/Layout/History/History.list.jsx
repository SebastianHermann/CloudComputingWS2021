import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToDoCard from '../../common/todo.card';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import IconButton from '@material-ui/core/IconButton';

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
  createPanel: {},
  titlePanel: {},
  subTitlePanel: {},
  countPanel: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sortPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  sortIcon: { verticalAlign: 'bottom' },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectItem: {
    background: 'transparent',
  },
  notesPanel: {},
}));

export default function HistoryList(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortProperty, setSortProperty] = useState('title');
  const [sortAsc, setSortAsc] = useState(true);

  // const loadData = async () => {
  //   let data = await fetch(`http://localhost:3001/notes/user`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ creator: props.user.googleId }),
  //   }).then((data) => data.json());
  //   setData(data);
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   loadData();
  //   setLoading(false);
  // }, [data]);

  const handleSortPropertyChange = (event) => {
    setSortProperty(event.target.value);
  };

  const compare = (a, b) => {
    if (a[sortProperty].toLowerCase() < b[sortProperty].toLowerCase()) {
      return sortAsc === true ? -1 : 1;
    }
    if (a[sortProperty].toLowerCase() > b[sortProperty].toLowerCase()) {
      return sortAsc === true ? 1 : -1;
    }
    return 0;
  };

  let doneToDos = props.data.filter((note) => note.status !== 'open');
  let sorted = doneToDos.sort(compare);
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <div>
          <Typography variant="subtitle1">
            <span style={{ fontWeight: 'bold' }}>
              {props.loading ? 'Loading...' : doneToDos.length + " To-Do's."}
            </span>
          </Typography>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <div className={classes.sortPanel}>
                <span>Sort By: </span>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortProperty}
                    onChange={(event) => handleSortPropertyChange(event)}
                  >
                    <MenuItem
                      value={'title'}
                      classes={{ selected: classes.selectItem }}
                    >
                      Title
                    </MenuItem>
                    <MenuItem
                      value={'category'}
                      classes={{ selected: classes.selectItem }}
                    >
                      Category
                    </MenuItem>
                    <MenuItem
                      value={'dueDate'}
                      classes={{ selected: classes.selectItem }}
                    >
                      Due Date
                    </MenuItem>
                  </Select>
                </FormControl>
                <IconButton className={classes.sortIcon}>
                  {sortAsc ? (
                    <AiOutlineSortAscending
                      onClick={() => setSortAsc(!sortAsc)}
                    />
                  ) : (
                    <AiOutlineSortDescending
                      onClick={() => setSortAsc(!sortAsc)}
                    />
                  )}
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
      {props.loading
        ? 'Loading...'
        : sorted.map((note) => (
            <Grid item lg={6} md={12}>
              <ToDoCard
                key={note._id}
                note={note}
                handleReload={props.handleReload}
              />
            </Grid>
          ))}
    </React.Fragment>
  );
}

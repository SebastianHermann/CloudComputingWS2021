import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HistoryIcon from '@material-ui/icons/History';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  menuItem: {
    padding: '20px 0px',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover': {
      color: '#3f51b5',
      background: 'rgba(0,0,0,0.02)',
    },
  },
  menuIcon: {
    textAlign: 'center',
    textDecoration: 'none',
  },
  menuText: {
    fontSize: '12px',
    textAlign: 'center',
    fontWeight: 'semi-bold',
    textDecoration: 'none',
  },
  userIcon: {
    textAlign: 'center',
  },
  userText: {
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userSubText: {
    fontSize: '12px',
    textAlign: 'center',
    fontWeight: 'semi-bold',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Menu(props) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.menuItem}>
          <div className={classes.userIcon}>
            <AccountCircleIcon />
          </div>
          <div className={classes.userText}>{props.user.givenName}</div>
          <div className={classes.userSubText}>
            <Link
              to="/login"
              style={{ textDecoration: 'none' }}
              onClick={props.handleLogout}
            >
              Sign Out
            </Link>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className={classes.menuItem}>
            <div className={classes.menuIcon}>
              <AssignmentIcon />
            </div>
            <div className={classes.menuText}>
              <span style={{ textDecoration: 'none' }}>My To-Dos</span>
            </div>
          </div>
        </Link>
      </Grid>
      {/* <Grid item xs={12}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <div className={classes.menuItem}>
            <div className={classes.menuIcon}>
              <AssessmentIcon />
            </div>
            <div className={classes.menuText}>Dashboard</div>
          </div>
        </Link>
      </Grid> */}
      <Grid item xs={12}>
        <Link to="/history" style={{ textDecoration: 'none' }}>
          <div className={classes.menuItem}>
            <div className={classes.menuIcon}>
              <HistoryIcon />
            </div>
            <div className={classes.menuText}>History</div>
          </div>
        </Link>
      </Grid>
    </Grid>
  );
}

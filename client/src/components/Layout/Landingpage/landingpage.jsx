import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Illustration from '../../../assets/undraw_To_do_list_re_9nt7.svg';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainColumnLeft: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    background: 'white',
  },
  mainColumnRight: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    background: '#0984e3',
  },
  mainContainer: {
    height: '100%',
    padding: '20%',
    textAlign: 'left',
  },
  logoPanel: {
    fontWeight: 'bolder',
  },
  imagePanel: {
    //   width: '50%',
  },
  image: {
    width: '50%',
    height: 'auto',
    position: 'absolute',
    right: '6%',
    bottom: '20%',
  },
}));

export default function Landingpage(props) {
  const classes = useStyles();
  const history = useHistory();
  const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const responseGoogleOk = (response) => {
    props.handleLogin(response);
    history.push('/');
  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={7}>
          <div className={classes.mainColumnLeft}>
            <Grid container spacing={0} className={classes.mainContainer}>
              <Grid item xs={12}>
                <div className={classes.logoPanel}>
                  <DoneAllIcon />
                  todont
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.greetingPanel}>
                  <Typography variant="h2" gutterBottom>
                    I bet you have a lot to do.
                  </Typography>
                </div>
                <div className={classes.greetingPanel}>
                  <Typography variant="h5">
                    Manage your to-dos quickly and easily now.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.signInPanel}>
                  <GoogleLogin
                    clientId={REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogleOk}
                    onFailure={responseGoogleFail}
                    cookiePolicy={'single_host_origin'}
                    // redirectUri="/history"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={5}>
          <div className={classes.mainColumnRight}>
            <Grid container spacing={0} className={classes.mainContainer}>
              <Grid item xs={12}>
                <div className={classes.imagePanel}>
                  <img
                    src={Illustration}
                    alt={'Illustration'}
                    className={classes.image}
                  ></img>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

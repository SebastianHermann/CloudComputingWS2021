import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Menu from './Menu';
import MyToDos from './MyTodos/MyToDos';
import History from './History/History';
import Landingpage from './Landingpage/landingpage';
import 'react-calendar/dist/Calendar.css';
import ProtectedRoute from '../common/auth/ProtectedRoute';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '5vh',
  },
  subcontainer: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = () => {
    setLogin(false);
    setUser({});
  };

  const handleLogin = (response) => {
    setLogin(true);
    setUser(response.profileObj);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" exact isAuth={login}>
          <Landingpage handleLogin={handleLogin}></Landingpage>
        </Route>
        <div className={classes.root}>
          <Container fixed xl>
            <Typography
              component="div"
              style={{
                backgroundColor: '#F5F3F8',
                height: '90vh',
                borderRadius: '20px',
              }}
            >
              <Grid container spacing={0} style={{ height: '90vh' }}>
                <Grid item xs={2}>
                  <div className={classes.subcontainer}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Menu user={user} handleLogout={handleLogout}></Menu>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <div className={classes.subcontainer}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <ProtectedRoute
                          path="/"
                          exact
                          isAuth={login}
                          component={MyToDos}
                          handleLogout={handleLogout}
                          user={user}
                        />
                        <ProtectedRoute
                          path="/history"
                          exact
                          isAuth={login}
                          component={History}
                          handleLogout={handleLogout}
                          user={user}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Typography>
          </Container>
        </div>
      </Switch>
    </Router>
  );
}

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events, import/extensions */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { useLazyQuery } from '@apollo/client';
import Home from './components/Home';
import Login from './components/Login';
import Listing from './components/Listing';
import ListingDetails from './components/ListingDetails';
import icon from './assets/icon.png';
import { FIND_LISTING } from './queries';

const App = () => {
  const history = useHistory();
  const [user, setUser] = useState<string|null>(null);
  const [message, setMessage] = useState<string|null>(null);

  // login form
  const [loginUser, setLoginUser] = useState('');
  const handleLoginUser = (typedLoginUser: string) => {
    setLoginUser(typedLoginUser);
  };

  const [loginPassword, setLoginPassword] = useState('');
  const handleLoginPassword = (typedLoginPassword: string) => {
    setLoginPassword(typedLoginPassword);
  };
  /// /////////////////////////////////////////////////////////
  const [userId, setUserId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState(''); // can be null
  const [userEmailAddress, setUserEmailAddress] = useState('');
  const [userStreet, setUserStreet] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userCategory, setUserCategory] = useState('');
  const [userDescription, setUserDescription] = useState('');

  const [getListing, result] = useLazyQuery(FIND_LISTING);

  useEffect(() => {
    // console.log(result.data)
    if (result.data) {
      if (result.data.findListing) {
        setUserId(result.data.findListing.id);
        setUserName(result.data.findListing.name);
        setUserEmailAddress(result.data.findListing.emailAddress);
        setUserStreet(result.data.findListing.address.street);
        setUserCity(result.data.findListing.address.city);
        setUserCategory(result.data.findListing.category);
        setUserDescription(result.data.findListing.description);
        if (result.data.findListing.phone) {
          setUserPhone(result.data.findListing.phone);
        }
      }
    }
  }, [result.data]);

  useEffect(() => {
    if (user && user !== "''") {
      getListing({ variables: { nameToSearch: user } });
    }
  }, [user]);

  /// //////////////////////////////////////////////////////

  // eslint-disable-next-line no-shadow
  const login = (user: string|null) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  const logout = () => {
    // console.log('log out');
    setUser(null);
    setUserId('');
    setUserName('');
    setUserPhone(''); // can be null
    setUserEmailAddress('');
    setUserStreet('');
    setUserCity('');
    setUserDescription('');
    setUserCategory('');
    setMessage('Logged out');
    setTimeout(() => {
      setMessage(null);
    }, 10000);
    history.push('/');
  };

  return (
    <Router>
      <Container>
        <div>
          {(message && (
          <Alert severity="success">
            {message}
          </Alert>
          )
  )}
        </div>
        <div>
          <AppBar position="static" style={{ background: '#27b970' }}>
            <Toolbar>
              <Button
                style={{
                  padding: '12px 18px',
                  fontSize: '16px',
                  color: '#DEE3E3',
                  borderRadius: 10,
                  width: 90,
                  height: 70,
                }}
                color="primary"
                component={Link}
                to="/"
              >
                home
              </Button>
              <Button
                style={{
                  padding: '12px 18px',
                  fontSize: '16px',
                  color: '#DEE3E3',
                  borderRadius: 10,
                  width: 90,
                  height: 70,
                }}
                component={Link}
                to="/listing"
              >
                Listing
              </Button>
              {userId
                ? (
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Button
                      style={{
                        padding: '12px 18px',
                        fontSize: '16px',
                        color: '#DEE3E3',
                        borderRadius: 10,
                        width: 90,
                        height: 70,
                      }}
                      color="primary"
                      component={Link}
                      to="/details"
                    >
                      Edit
                    </Button>
                  </div>
                )
                : (
                  <Button
                    style={{
                      padding: '12px 18px',
                      fontSize: '16px',
                      color: '#DEE3E3',
                      borderRadius: 10,
                      width: 90,
                      height: 70,
                    }}
                    color="primary"
                    component={Link}
                    to="/details"
                  >
                    Add
                  </Button>
                )}
              {user
                ? (
                  <div>
                    <Button
                      style={{
                        padding: '12px 18px',
                        fontSize: '12px',
                        color: '#DEE3E3',
                        borderRadius: 10,
                        width: 90,
                        height: 70,
                      }}
                      onClick={logout}
                    >
                      {user}
                      {' '}
                      logout
                    </Button>
                  </div>
                )
                : (
                  <Button
                    style={{
                      padding: '12px 18px',
                      fontSize: '16px',
                      color: '#DEE3E3',
                      borderRadius: 10,
                      width: 90,
                      height: 70,
                    }}
                    component={Link}
                    to="/login"
                  >
                    login
                  </Button>
                )}
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
              <img alt="icon" src={icon} height="50" width="50" onClick={(event) => event.preventDefault()} />
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/listing">
              <Listing />
            </Route>
            <Route path="/details">
              {user ? (
                <ListingDetails
                  user={user}
                  userId={userId}
                  userPhone={userPhone}
                  userEmailAddress={userEmailAddress}
                  userStreet={userStreet}
                  userCity={userCity}
                  userDescription={userDescription}
                  userCategory={userCategory}
                />
              ) : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <Login
                onLogin={login}
                typedUser={loginUser}
                typedUserHandle={handleLoginUser}
                typedPassword={loginPassword}
                typedPasswordHandle={handleLoginPassword}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <div>
            <br />
            <em>Let your fingers do the scrolling!</em>
          </div>
        </div>
      </Container>
    </Router>
  );
};

export default App;

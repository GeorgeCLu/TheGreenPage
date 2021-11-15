import React, { useEffect, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import {
  useHistory,
} from 'react-router-dom';

interface LoginProps {
  // eslint-disable-next-line no-unused-vars
  onLogin: ((user: string) => void),
  typedUser : string,
  // eslint-disable-next-line no-unused-vars
  typedUserHandle: ((user: string) => void),
  typedPassword: string,
  // eslint-disable-next-line no-unused-vars
  typedPasswordHandle: ((user: string) => void);
}

const Login = (props: LoginProps) => {
  const history = useHistory();

  const [IsFormValid, setIsFormValid] = React.useState(false);

  useEffect(() => {
    if (
      props.typedUser.length >= 1
      && props.typedUser.length <= 25
      // && ((user !== 'admin' && user !== 'Admin' && user !== 'ADMIN')
      // || ((user === 'admin' || user === 'Admin' || user === 'ADMIN')
      // && password === 'password'))
      && props.typedPassword.length >= 1
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [props.typedUser, props.typedPassword]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(props.typedUser);
    props.typedUserHandle('');
    props.typedPasswordHandle('');
    history.push('/');
  };

  const handleUser = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.typedUserHandle(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.typedPasswordHandle(event.target.value);
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div>
            <TextField
              label="username"
              value={props.typedUser}
              onChange={handleUser}
            />
          </div>
          <div>
            <TextField
              label="password"
              type="password"
              value={props.typedPassword}
              onChange={handlePassword}
            />
          </div>
          <br />
          <div>
            {IsFormValid && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                style={{
                  borderRadius: 20,
                  backgroundColor: '#c7c8ca',
                  padding: '10px 15px',
                  fontSize: '15px',
                  color: '#292526',
                }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!IsFormValid}
              >
                Login
              </Button>
            </Grid>
            )}
          </div>
        </form>
      </Grid>
    </div>
  );
};

export default Login;

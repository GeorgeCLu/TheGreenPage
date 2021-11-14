import React from 'react';
import {
  Grid,
} from '@material-ui/core';

interface NotifyMessageProp {
    errorMessage: string|null,
  }

const NotifyMessage = (props: NotifyMessageProp) => {
  if (!props.errorMessage) {
    return (<div />);
  }
  return (
    <div style={{ color: 'red' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {props.errorMessage}
      </Grid>
    </div>
  );
};

export default NotifyMessage;

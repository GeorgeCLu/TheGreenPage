import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import { FIND_LISTING } from '../queries';
import ListingProp from '../common/listing';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

interface ListingsProp {
  listings: ListingProp[]|null,
}

const Listings = (props:ListingsProp) => {
  const [listing, setListing] = useState<ListingProp|null>(null);
  const [getListing, result] = useLazyQuery(FIND_LISTING);
  const [expand, setExpand] = useState<boolean>(false);

  const showListing = (name: string) => {
    getListing({ variables: { nameToSearch: name } });
  };

  const open = (name: string) => {
    setExpand(true);
    showListing(name);
  };

  const close = () => {
    setExpand(false);
    setListing(null);
  };

  const handleIconClicks = (name: string) => {
    open(name);
  };

  useEffect(() => {
    if (expand && result.data) {
      setListing(result.data.findListing);
    }
  }, [result.data, expand]);

  if (listing) {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h2>{listing?.name}</h2>
          <h3>{listing?.category}</h3>
          <div>
            {listing?.address.street}
            {' '}
            {listing?.address.city}
          </div>
          <div>{listing?.phone}</div>
          <div>{listing?.emailAddress}</div>
          <div>{listing?.description}</div>
          <br />
          <Button
            style={{
              borderRadius: 20,
              backgroundColor: '#c7c8ca',
              padding: '5px 10px',
              fontSize: '15px',
              color: '#292526',
            }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Grid>
      </div>
    );
  }

  if (!props.listings) {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h2>Listings</h2>
          None found
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <h2>Listings</h2>
        {props.listings.map((p: ListingProp) => (
          <div key={p.name}>
            {p.category}
            <Button
              color="primary"
              onClick={() => {
                handleIconClicks(p.name);
              }}
            >
              {p.name}
            </Button>
            <br />
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default Listings;

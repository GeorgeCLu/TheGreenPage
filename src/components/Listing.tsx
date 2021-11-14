/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Listings from './Listings';
import { ALL_LISTINGS } from '../queries';
import ListingProp from '../common/listing';
import NotifyMessage from './NotifyMessage';

const Listing = () => {
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const result = useQuery(ALL_LISTINGS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const notify = (message: string|null) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (result.data) {
    const listings = result.data.allListings as ListingProp[];
    return (
      <div>
        <NotifyMessage errorMessage={errorMessage} />
        <Listings listings={listings} />
      </div>
    );
  }
  return (
    <div>
      <NotifyMessage errorMessage={errorMessage} />
    </div>
  );
};

export default Listing;

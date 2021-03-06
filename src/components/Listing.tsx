/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Listings from './Listings'
import { ALL_LISTINGS } from '../queries'
import ListingProp from '../common/listing';
import NotifyMessage from './NotifyMessage'

const Listing = () => {
  const [errorMessage, setErrorMessage] = useState<string|null>(null)
  const result = useQuery(ALL_LISTINGS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message: string|null) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.data){
    const listings = result.data.allListings as ListingProp[];
    return (
      <div>
        <NotifyMessage errorMessage={errorMessage} />
        <Listings listings={listings} />
      </div>
    )
   }
   return (
    <div>
      <NotifyMessage errorMessage={errorMessage} />
    </div>
   )
};

export default Listing;

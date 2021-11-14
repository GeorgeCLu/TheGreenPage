/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import ListingForm from './ListingForm'
import { ALL_LISTINGS } from '../queries'
import NotifyMessage from './NotifyMessage'

interface ListingDetailsProps {
  user: string,
  userId: string,
  userPhone: string,
  userEmailAddress: string,
  userStreet: string,
  userCity: string,
  userDescription: string,
  userCategory:string
}

const ListingDetails = (props: ListingDetailsProps) => {
  const [errorMessage, setErrorMessage] = useState<string|null>(null)
  const result = useQuery(ALL_LISTINGS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message: string|null) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.data){
    // const listings = result.data.allListings as ListingProp[];
    return (
      <div>
        <br />
        <NotifyMessage errorMessage={errorMessage} />
        <ListingForm
          setError={notify}
          user={props.user}
          userId={props.userId}
          userPhone={props.userPhone}
          userEmailAddress={props.userEmailAddress}
          userStreet={props.userStreet}
          userCity={props.userCity}
          userDescription={props.userDescription}
          userCategory={props.userCategory}
        />
      </div>
    )
   }
   return (
    <div>
      <br />
      <NotifyMessage errorMessage={errorMessage} />
      <ListingForm
        setError={notify}
        user={props.user}
        userId={props.userId}
        userPhone={props.userPhone}
        userEmailAddress={props.userEmailAddress}
        userStreet={props.userStreet}
        userCity={props.userCity}
        userDescription={props.userDescription}
        userCategory={props.userCategory}
      />
    </div>
   )
};

export default ListingDetails;

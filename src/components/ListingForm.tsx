import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import {
  ALL_LISTINGS, CREATE_LISTING, FIND_LISTING, EDIT_LISTING, REMOVE_LISTING,
} from '../queries';

interface ListingFormProps {
  // eslint-disable-next-line no-unused-vars
  setError: ((message: string|null) => void),
  user: string,
  userId: string,
  userPhone: string,
  userEmailAddress: string,
  userStreet: string,
  userCity: string,
  userDescription: string,
  userCategory: string,
}

// eslint-disable-next-line react/function-component-definition
const ListingForm = (props: ListingFormProps) => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(props.user);
  const [phone, setPhone] = useState(props.userPhone);
  const [street, setStreet] = useState(props.userStreet);
  const [city, setCity] = useState(props.userCity);
  const [emailAddress, setEmailAddress] = useState(props.userEmailAddress);
  const [category, setCategory] = useState(props.userCategory);
  const [description, setDescription] = useState(props.userDescription);

  // eslint-disable-next-line camelcase
  const error_string = 'ERROR: ';

  const [createListing] = useMutation(CREATE_LISTING, {
    refetchQueries:
      [{ query: ALL_LISTINGS }, { query: FIND_LISTING, variables: { nameToSearch: name } }],
    onError: (error) => {
      props.setError(error_string.concat(error.graphQLErrors[0].message));
    },
  });

  const [editListing] = useMutation(EDIT_LISTING, {
    refetchQueries:
      [{ query: ALL_LISTINGS }, { query: FIND_LISTING, variables: { nameToSearch: name } }],
    onError: (error) => {
      props.setError(error_string.concat(error.graphQLErrors[0].message));
    },
  });

  const [deleteListing] = useMutation(REMOVE_LISTING, {
    refetchQueries:
      [{ query: ALL_LISTINGS }, { query: FIND_LISTING, variables: { nameToSearch: name } }],
    onError: (error) => {
      props.setError(error_string.concat(error.graphQLErrors[0].message));
    },
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createListing({
        variables: {
          name, phone, street, city, emailAddress, category, description,
        },
      });
    } catch {
      // nothing
    }
    props.setError('Details added');
  };

  const edit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setError('Edited details added');
    editListing({
      variables: {
        name, phone, street, city, emailAddress, category, description,
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  const deleteUserListing = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setError('Listing Deleted');
    // eslint-disable-next-line no-console
    console.log('Clicked delete');
    deleteListing({
      variables: { name },
    });
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPhone(event.target.value);
  };

  const handleStreet = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStreet(event.target.value);
  };

  const handleCity = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const handleemailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmailAddress(event.target.value);
  };

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCategory(event.target.value);
  };

  if (props.userId) {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h2>Edit information</h2>
          <form onSubmit={edit}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <div>
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={handlePhone}
                />
              </div>
              <div>
                <TextField
                  label="Street"
                  value={street}
                  onChange={handleStreet}
                />
              </div>
              <div>
                <TextField
                  label="City"
                  value={city}
                  onChange={handleCity}
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  value={emailAddress}
                  onChange={handleemailAddress}
                />
              </div>
              <div>
                <TextField
                  label="Category"
                  value={category}
                  onChange={handleCategory}
                />
              </div>
            </Grid>
            <br />
            <div>
              <TextField
                label="Description"
                value={description}
                onChange={handleDescription}
                multiline
                minRows={6}
                maxRows={32}
                size="medium"
                fullWidth
              />
            </div>
            <br />
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
                  padding: '5px 10px',
                  fontSize: '15px',
                  color: '#292526',
                }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Edit
              </Button>
            </Grid>
            <br />
          </form>

          <h2>Delete information button to be added</h2>

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
        <h2>Add information to listing</h2>
        <form onSubmit={submit}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <div>
              <TextField
                label="Phone"
                value={phone}
                onChange={handlePhone}
              />
            </div>
            <div>
              <TextField
                label="Street"
                value={street}
                onChange={handleStreet}
              />
            </div>
            <div>
              <TextField
                label="City"
                value={city}
                onChange={handleCity}
              />
            </div>
            <div>
              <TextField
                label="Email"
                value={emailAddress}
                onChange={handleemailAddress}
              />
            </div>
            <div>
              <TextField
                label="Category"
                value={category}
                onChange={handleCategory}
              />
            </div>
          </Grid>
          <br />
          <div>
            <TextField
              label="Description"
              value={description}
              onChange={handleDescription}
              multiline
              minRows={6}
              maxRows={32}
              size="medium"
              fullWidth
            />
          </div>
          <br />
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
                padding: '5px 10px',
                fontSize: '15px',
                color: '#292526',
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
          </Grid>
          <br />
        </form>
      </Grid>
    </div>
  );
};

export default ListingForm;

import { gql  } from '@apollo/client'

export const ALL_LISTINGS = gql`
  query {
    allListings  {
      name
      phone
      id
      emailAddress
      category
      description
    }
  }
`
export const FIND_LISTING = gql`
  query findListingByName($nameToSearch: String!) {
    findListing(name: $nameToSearch) {
      name
      phone 
      id
      emailAddress
      category
      description
      address {
        street
        city
      }
    }
  }
`
export const CREATE_LISTING = gql`
  mutation createListing($name: String!, $street: String!, $city: String!, $phone: String, $emailAddress:String!, $category:String!, $description:String!) {
    addListing(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone,
      emailAddress: $emailAddress
      category: $category
      description: $description
    ) {
      name
      phone
      id
      emailAddress
      category
      description
      address {
        street
        city
      }
    }
  }
`
export const SEARCH_LISTING = gql`
  query findListingById($id: ID!) {
    findListingById(
      id: $id
    ) {
      name
      phone
      id
      emailAddress
      category
      description
      address {
        street
        city
      }
    }
  }
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      name
      phone
      address {
        street
        city
      }
      emailAddress
      category
      description
      id
    }
  }
`
export const EDIT_EMAILADDRESS = gql`
  mutation editEmailAddress($name: String!, $emailAddress: String!) {
    editEmailAddress(name: $name, emailAddress: $emailAddress)  {
      name
      phone
      address {
        street
        city
      }
      emailAddress
      category
      description
      id
    }
  }
`

export const EDIT_LISTING = gql`
mutation editListing($name: String!, $street: String!, $city: String!, $phone: String, $emailAddress:String!, $category:String!, $description:String!) {
  editListing(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone,
    emailAddress: $emailAddress
    category: $category
    description: $description
  )  {
    name
    phone
    address {
      street
      city
    }
    emailAddress
    category
    description
    id
  }
}
`
export const REMOVE_LISTING = gql`
  mutation deleteListing($name: String!) {
    deleteListing(
      name: $name,
    ) {
      name
      phone
      id
      emailAddress
      category
      description
      address {
        street
        city
      }
    }
  }
`

interface Address {
    street: string,
    city: string
  }

export default interface ListingProp {
    name: string,
    phone: string|null,
    address: Address,
    emailAddress: string,
    id: string,
    category: string,
    description:string,
  // eslint-disable-next-line semi
  }

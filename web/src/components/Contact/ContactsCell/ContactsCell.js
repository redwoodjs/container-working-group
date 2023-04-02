import { Link, routes } from '@redwoodjs/router'

import Contacts from 'src/components/Contact/Contacts'

export const QUERY = gql`
  query FindContacts {
    contacts {
      id
      name
      email
      message
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No contacts yet. '}
      <Link to={routes.newContact()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ contacts }) => {
  return <Contacts contacts={contacts} />
}

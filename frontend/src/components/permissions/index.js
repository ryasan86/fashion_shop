import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { capitalCase } from 'change-case'

import Permissions from './permissions.styles'
import Table from '../table'
import Icon from '../icons'
import possiblePermissions, {
  ADMIN,
  USER,
  ITEM_CREATE,
  ITEM_UPDATE,
  ITEM_DELETE,
  PERMISSION_UPDATE
} from '../../types/permission-types'
import ErrorBoundary from '../error-boundary'
import Loader from '../loader'
import {
  useUpdatePermissionsMutation,
  useUsersQuery
} from '../../graphql/user/hooks'
import { Button, Input } from '../../shared/elements'
import { toast } from '../toast'
import { HeaderCell, Cell } from '../table/table.styles'

const KeyIcon = () => (
  <HeaderCell
    styles={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Icon name='key' style={{ padding: '1.5rem' }} />
  </HeaderCell>
)

const createPermissionsData = users => ({
  headRow: [
    { text: 'Username' },
    { text: 'Email' },
    { text: capitalCase(ADMIN) },
    { text: capitalCase(USER) },
    { text: capitalCase(ITEM_CREATE) },
    { text: capitalCase(ITEM_UPDATE) },
    { text: capitalCase(ITEM_DELETE) },
    { text: capitalCase(PERMISSION_UPDATE) },
    { Jsx: KeyIcon }
  ],
  bodyRows: [
    ...users.map(user => [
      { text: user.username },
      { text: user.email },
      { Jsx: UserPermissions, props: { user } }
    ])
  ]
})

const UserPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions)
  const [updateUser, { data, error }] = useUpdatePermissionsMutation()

  const handleUpdateUser = () => {
    updateUser({ variables: { permissions, userId: user.id } })
  }

  const handlePermissionChange = e => {
    const checkbox = e.target
    if (checkbox.checked) {
      setPermissions(prevPermissions => [...prevPermissions, checkbox.value])
    } else {
      setPermissions(prevPermissions =>
        prevPermissions.filter(p => p !== checkbox.value)
      )
    }
  }

  useEffect(() => {
    if (data && data.updatePermissions) toast('Update successful.')
  }, [data])

  return (
    <ErrorBoundary error={error}>
      {possiblePermissions.map((permission, i) => (
        <Cell key={i}>
          <Input
            type='checkbox'
            value={permission}
            onChange={handlePermissionChange}
            checked={permissions.includes(permission)}
          />
        </Cell>
      ))}
      <Cell>
        <Button onClick={handleUpdateUser}>Update</Button>
      </Cell>
    </ErrorBoundary>
  )
}

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array
  }).isRequired
}

const PermissionsComponent = () => {
  const { data, loading, error } = useUsersQuery()

  return loading ? (
    <Loader color='white' size='medium' />
  ) : (
    <ErrorBoundary error={error}>
      <Permissions>
        <Table {...createPermissionsData(data.users)} />
      </Permissions>
    </ErrorBoundary>
  )
}

export default PermissionsComponent

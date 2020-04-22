import { useQuery, useMutation } from '@apollo/react-hooks'

import {
  SIGNUP_MUTATION,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  DELETE_ME
} from './mutations'
import { CURRENT_USER_QUERY } from './queries'

export const useCurrentUserQuery = () => {
  return useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-first'
  })
}

export const useDeleteMeMutation = () => {
  return useMutation(DELETE_ME, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
}

export const useSigninMutation = () => {
  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  return { authorize: signin, data, error, loading }
}

export const useSignoutMutation = () => {
  return useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
}

export const useSignupMutation = () => {
  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {})
  return { authorize: signup, data, error, loading }
}

import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import { toast } from 'react-toastify'

import Header from './header.styles'
import {
  useCurrentUserQuery,
  useSignoutMutation
} from '../../graphql/user/hooks'

const HeaderComponent = () => {
  const { data } = useCurrentUserQuery()
  const [signout, { data: signoutData }] = useSignoutMutation()
  const me = data && data.me

  useEffect(() => {
    if (signoutData) toast(signoutData.signout.message)
  }, [signoutData])

  const goToAccountPage = () => {
    navigate('/account')
  }

  // prettier-ignore
  const navItems = [
    { isVisible: true, element: <Header.Link to="/">HOME</Header.Link> },
    { isVisible: true, element: <Header.Link to="/shop">SHOP</Header.Link> },
    { isVisible: me, element: <Header.SignoutBtn onClick={signout}>SIGNOUT</Header.SignoutBtn> },
    { isVisible: !me, element: <Header.Link to="/signin">SIGNIN</Header.Link> },
    { isVisible: me, element: <Header.NavIcon name="account-circle" onClick={goToAccountPage} /> }
  ]

  return (
    <Header>
      <Header.LogoContainer to="/">
        <Header.Logo name="logo-royal" />
      </Header.LogoContainer>
      <Header.Nav>
        {navItems
          .filter(item => item.isVisible)
          .map((item, i) => (
            <Header.NavItem key={i}>{item.element}</Header.NavItem>
          ))}
      </Header.Nav>
    </Header>
  )
}

export default HeaderComponent

import React, { useEffect, useRef } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Link } from 'gatsby'

import Header from './header.styles'
import useAuth from '../auth'
import Cart from '../cart'
import Icon from '../icons'
import Loader from '../loader'
import Search from '../search'
import { A } from '../../shared/elements'
import { useCurrentUserQuery } from '../../graphql/user/hooks'
import { toast } from '../toast'
import { useCartQuery, useUploadCartMutation } from '../../graphql/cart/hooks'
import { cartInitialState } from '../../graphql/cart/reducer'
import { SIGNOUT } from '../../types/auth-form-types'

const HeaderComponent: React.FC = () => {
    const client = useApolloClient()
    const { data: cartData } = useCartQuery()
    const { data: userData } = useCurrentUserQuery()
    const [signout, { data: signoutData, loading }] = useAuth()
    const [uploadCart] = useUploadCartMutation()
    const navRef = useRef(null)
    const me = userData?.me

    const handleSignout = () => {
        signout({
            variables: { authMethod: SIGNOUT }
        })

        const variables = {
            data: cartData?.cartItems.map(c => ({
                productId: c.product.id,
                quantity: c.quantity
            }))
        }

        uploadCart({ variables })
        client.writeData({ data: cartInitialState })
    }

    useEffect(() => {
        if (signoutData) toast(signoutData.signout.message)
    }, [signoutData])

    return (
        <Header>
            <Header.LogoContainer to='/'>
                <Icon name='logo-royal' />
            </Header.LogoContainer>
            <Search />
            <Header.NavList ref={navRef} me={me}>
                {loading ? (
                    <Loader size='small' />
                ) : (
                    <>
                        <Header.NavItem>
                            <Link to='/'>
                                <Icon name='home' />
                                HOME
                            </Link>
                        </Header.NavItem>
                        <Header.NavItem>
                            <Link to='/shop/'>
                                <Icon name='store' />
                                SHOP
                            </Link>
                        </Header.NavItem>
                        {me && (
                            <Header.NavItem>
                                <A onClick={handleSignout}>
                                    <Icon name='exit' />
                                    SIGNOUT
                                </A>
                            </Header.NavItem>
                        )}
                        {!me && (
                            <Header.NavItem>
                                <Link to='/signin/'>
                                    <Icon name='key-outlined' />
                                    SIGNIN
                                </Link>
                            </Header.NavItem>
                        )}
                        {!me && (
                            <Header.NavItem>
                                <Link to='/signup/'>
                                    <Icon name='key-filled' />
                                    SIGNUP
                                </Link>
                            </Header.NavItem>
                        )}
                        {me && (
                            <Header.NavItem>
                                <Link to='/account/'>
                                    <Icon name='account-circle' />
                                    ACCOUNT
                                </Link>
                            </Header.NavItem>
                        )}
                    </>
                )}
            </Header.NavList>
            <Cart />
        </Header>
    )
}

export default HeaderComponent

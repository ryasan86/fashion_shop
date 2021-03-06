import styled from 'styled-components'
import { Link } from 'gatsby'

import Icon from '../icons'
import { device } from '../../shared/utils'
import { H4 } from '../../shared/elements'

interface CartOpenInterface {
    cartOpen: boolean
}

const Cart = styled.div`
    background: var(--dark);
    bottom: 0;
    height: 100%;
    outline: 0;
    position: fixed;
    right: ${(props: CartOpenInterface) => (props.cartOpen ? '0' : '-45rem')};
    transition: right 0.2s;
    width: 45rem;
    z-index: 9999;

    &::after {
        background: var(--red);
        content: '';
        height: ${(props: CartOpenInterface) =>
            props.cartOpen ? '100%' : '0'};
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: height 0.5s;
        transition-delay: 0.2s;
        width: 2px;
    }

    @media ${device.mobileL} {
        right: ${(props: CartOpenInterface) =>
            props.cartOpen ? '0' : '-35rem'};
        width: 35rem;
    }
`

export const ToggleButton = styled.div`
    align-items: center;
    background: var(--dark);
    cursor: pointer;
    display: flex;
    fill: white;
    flex-direction: column;
    font-size: var(--font-size-m);
    height: 10rem;
    justify-content: center;
    left: -9rem;
    outline: 0;
    position: absolute;
    transition: fill 0.2s;
    width: 9rem;

    &::before {
        background: var(--red);
        bottom: 0;
        content: '';
        height: ${(props: CartOpenInterface) =>
            props.cartOpen ? '100%' : '0'};
        left: 0;
        position: absolute;
        transition: height 0.2s ease-out;
        transition-delay: ${(props: CartOpenInterface) =>
            props.cartOpen ? '0.8s' : '0'};
        width: 2px;
    }

    &::after {
        background: var(--red);
        bottom: 0;
        content: '';
        height: 3px;
        position: absolute;
        right: 0;
        transition: width 0.2s ease-out;
        transition-delay: ${(props: CartOpenInterface) =>
            props.cartOpen ? '0.6s' : '0'};
        width: ${(props: CartOpenInterface) => (props.cartOpen ? '100%' : '0')};
    }

    &:hover {
        color: var(--red);
    }

    @media ${device.mobileL} {
        bottom: 10rem;
    }
`

ToggleButton.Icon = styled(Icon)`
    height: 3rem;
    width: 3rem;
`

export const Content = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    height: 70%;
    overflow-y: scroll;
`

Content.Header = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 0;
    text-align: center;
`

Content.HeaderTitle = styled(H4)`
    margin: 0;
`

Content.HeaderIcon = Icon

Content.BagContainer = styled.div`
    align-items: center;
    display: flex;
    height: 7rem;
    justify-content: center;
    position: relative;
    width: 9rem;
`

Content.HeaderLinkToShop = styled(Link)`
    cursor: pointer;
    font-size: var(--font-size-lg);
    text-decoration: underline;
    transition: color 0.3s;

    &:hover {
        color: var(--light-gray);
    }

    &:visited {
        color: inherit;

        &:hover {
            color: var(--light-gray);
        }
    }
`

Content.CartList = styled.ul`
    flex: 1;
`

Content.EmptyDisplay = styled.div`
    display: block;
    font-size: var(--font-size-lg);
    text-align: center;
    width: 100%;
`

export default Cart

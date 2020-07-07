import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

import TakeMyMoney from './take-my-money.styles'
import { toast } from '../../toast'
import { Button } from '../../../elements'
import { useCurrentUserQuery } from '../../../graphql/user/hooks'
import { getImage } from '../../../utils';

const stripeKey = `pk_test_51H1pe1AjCAxQG9ChPsx3SD8aXdVEcMKUnz3mnbV4jzCzDcNeVL6dnjSW34RmamWPz4PCqHm850nW91kARGVnL4pn00s68jhaO2`

const TakeMyMoneyComponent = ({ cartItems, cartTotal, cartCount }) => {
  const { data } = useCurrentUserQuery()
  const me = data && data.me
  const isReady = me && cartItems.length > 0
  const image = getImage(cartItems[0].product.sku)

  const handleToastMessage = () => {
    if (!me) {
      toast('You must be signed in to purchase something')
    } else if (!cartItems.length) {
      toast('Cart is empty')
    }
  }

  const onToken = (res) => {
    console.log('on token called: ', res.id)
  }

  return (
    <TakeMyMoney className="close-btn">
      {isReady && (
        <StripeCheckout
          stripeKey={stripeKey}
          amount={cartTotal}
          name="Fashion Shop"
          description={`Order of ${cartCount} items`}
          image={image}
          currency="USD"
          email={me.email}
          token={res => onToken(res)}
        >
          <Button>CHECKOUT</Button>
        </StripeCheckout>
      )}
      {!isReady && <Button onClick={handleToastMessage}>CHECKOUT</Button>}
    </TakeMyMoney>
  )
}

export default TakeMyMoneyComponent

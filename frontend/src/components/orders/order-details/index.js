import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { navigate } from '@reach/router'

import OrderDetails, {
  OrderItem,
  Summary,
  OrderList,
  Text,
  TextKey
} from './order-details.styles'
import Loader from '../../loader'
import ErrorBoundary from '../../error-boundary'
import { formatPrice, getThumbnail } from '../../../shared/utils'
import { useProductQuery } from '../../../graphql/product/hooks'

const OrderItemComponent = ({ item }) => {
  const { data, loading, error } = useProductQuery({
    variables: { where: { sku: item.sku } }
  })

  const goToProductDetails = item => {
    navigate(`/shop/${data.product.id}/`)
  }

  if (loading) {
    return <Loader size='small' />
  }

  // prettier-ignore
  return (
    <ErrorBoundary error={error}>
      <OrderItem key={item.id} onClick={() => goToProductDetails(item)}>
        <OrderItem.ImageContainer>
          <OrderItem.Image src={[getThumbnail([item.sku + '-1'])]} />
        </OrderItem.ImageContainer>
        <OrderItem.Cost>
          <Text><TextKey modifiers='red_color'>Price:&nbsp;</TextKey>{formatPrice(item.price)}</Text>
          <Text><TextKey modifiers='red_color'>Qty:&nbsp;</TextKey>{item.quantity}</Text>
          <Text><TextKey modifiers='red_color'>Total:&nbsp;</TextKey>{formatPrice(item.price * item.quantity)}</Text>
        </OrderItem.Cost>
        <OrderItem.Info>
          <Text>{item.title}</Text>
          {item.size && (
            <Text><TextKey modifiers='red_color'>Size:</TextKey>{item.size}</Text>
          )}
          <Text>{item.description}</Text>
        </OrderItem.Info>
      </OrderItem>
    </ErrorBoundary>
  )
}

const OrderDetailsComponent = ({ order }) => {
  // prettier-ignore
  return (
    <OrderDetails>
      <Summary>
        <Text><TextKey>Id: </TextKey>{order.id}</Text>
        <Text><TextKey>Charge Id: </TextKey>{order.chargeId}</Text>
        <Text><TextKey>Total: </TextKey>{formatPrice(order.total)}</Text>
        <Text><TextKey>Created: </TextKey>{moment(order.createdAt).format('LL')}</Text>
        <Text><TextKey>Updated: </TextKey>{moment(order.updatedAt).format('LL')}</Text>
      </Summary>
      <OrderList>
        {order.orderItems.map(item => (
          <OrderItemComponent key={item.id} item={item} />
        ))}
      </OrderList>
    </OrderDetails>
  )
}

OrderDetailsComponent.propTypes = {
  order: PropTypes.shape({
    chargeId: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    id: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired
  })
}

export default OrderDetailsComponent

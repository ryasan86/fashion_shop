import React from 'react'

import Products from './products.styles'
import ProductList from './product-list'
import ControlsHeader from './controls-header/index'
import {
  useProductsConnectionQuery,
  useFiltersQuery
} from '../../graphql/product/hooks'

const ProductsComponent = () => {
  const { data: { sizeFilters, freeShippingSelected } } = useFiltersQuery() // prettier-ignore
  const { data, error, loading } = useProductsConnectionQuery({
    sizeFilters,
    freeShippingSelected
  })
  const count = data?.productsConnection?.aggregate?.count
  const products = data?.productsConnection.edges.map(e => e.node)

  return (
    <Products>
      <ControlsHeader count={count} />
      <Products.Container>
        <Products.ErrorBoundary error={error}>
          {loading ? (
            <Products.Loader color="white" />
          ) : (
            <ProductList products={products} />
          )}
        </Products.ErrorBoundary>
      </Products.Container>
    </Products>
  )
}

export default ProductsComponent

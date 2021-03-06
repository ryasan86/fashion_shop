const { intersection, isEmpty } = require('lodash')
const { forwardTo } = require('prisma-binding')
const { isLoggedIn, throwError, hasPermission } = require('../utils.js')

const sizeIsInStock = (sizes, filters) => {
  return intersection(sizes, filters).length > 0
}

const availableSizes = itemIds => {
  return !isEmpty(itemIds)
}

const Query = {
  me: async (parent, args, ctx, info) => {
    if (!isLoggedIn(ctx)) return null
    const user = await ctx.db.query.user({ where: { id: ctx.request.userId } }, info)
    return user
  },
  orders: forwardTo('db'),
  ordersConnection: forwardTo('db'),
  product: forwardTo('db'),
  products: forwardTo('db'),
  productsConnection: async (parent, args, ctx, info) => {
    const { sizeFilters, categoryFilters, freeShippingSelected } = args
    const { edges } = await ctx.db.query.productsConnection(
      {},
      '{ edges { node { id availableSizes } } }'
    )

    const itemsWithSizesAvailable = edges.filter(({ node }) => {
      return sizeIsInStock(node.availableSizes, sizeFilters)
    })

    const itemIds = itemsWithSizesAvailable.map(({ node }) => node.id)

    const where = {
      ...(freeShippingSelected && { isFreeShipping: true }),
      ...(availableSizes(itemIds) && { id_in: itemIds }),
      ...(categoryFilters && categoryFilters.length && { category_in: categoryFilters }) // prettier-ignore
    }

    return ctx.db.query.productsConnection({ where }, info)
  },

  users: (parent, args, ctx, info) => {
    if (!isLoggedIn(ctx)) {
      throwError('You must be signed in to perform this action.')
    }

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSION_UPDATE'])

    return ctx.db.query.users({}, info)
  }
}

module.exports = Query

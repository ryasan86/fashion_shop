import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

import Home, { Card } from '../../styles/home-page.styles'
import SEO from '../../components/seo'
import Layout from '../../layouts/global-layout'
import Loader from '../../components/loader'
import ErrorBoundary from '../../components/error-boundary'
import { DiagonalBody, NinjaText, SkullText } from '../../images'
import { H1, H3 } from '../../elements'
import { useProductsQuery } from '../../graphql/product/hooks'
import { getFrontImage, getBackImg } from '../../utils'
import { useAddCategoryFilterMutation } from '../../graphql/filter/hooks'
import { HOODIE, SHIRT } from '../../types/category-types'
import SocialMedia from './social-media-icons'

const imageContainerVariants = {
  hidden: { opacity: 0, y: -300 },
  show: {
    opacity: 1,
    transition: { duration: 1, when: 'beforeChildren' },
    y: 0
  }
}

const imageVariants = {
  hidden: { width: 0 },
  show: {
    transition: { duration: 2, type: 'spring' },
    width: 250
  }
}

const FeaturedProducts = ({ products }) => {
  const [featureA, featureB] = products
  const [addCategoryFilter, { data }] = useAddCategoryFilterMutation()

  const handleClick = category => {
    addCategoryFilter({ variables: { category } })
  }

  useEffect(() => {
    if (data) navigate('/shop')
  }, [data])

  return (
    <Home.FeaturedProducts>
      <Card variants={imageContainerVariants} initial='hidden' animate='show'>
        <Card.Header>
          <H3>HOODIES</H3>
        </Card.Header>
        <Card.CallToAction onClick={() => handleClick(HOODIE)}>
          VIEW ALL
        </Card.CallToAction>
        <Card.ImageContainer>
          <Card.Image
            variants={imageVariants}
            image={getFrontImage(featureA.sku)}
          />
          <Card.Image
            variants={imageVariants}
            image={getBackImg(featureA.sku)}
          />
          <SkullText position='top-left' />
        </Card.ImageContainer>
      </Card>
      <Card variants={imageContainerVariants} initial='hidden' animate='show'>
        <Card.Header>
          <H3>CREW</H3>
        </Card.Header>
        <Card.CallToAction onClick={() => handleClick(SHIRT)}>
          VIEW ALL
        </Card.CallToAction>
        <Card.ImageContainer bottomRight>
          <Card.Image
            variants={imageVariants}
            image={getBackImg(featureB.sku)}
          />
          <Card.Image
            variants={imageVariants}
            image={getFrontImage(featureB.sku)}
          />
          <NinjaText />
        </Card.ImageContainer>
      </Card>
    </Home.FeaturedProducts>
  )
}

const HomePage = () => {
  const { data, loading, error } = useProductsQuery({
    variables: { where: { isFeatured: true } }
  })

  return (
    <Layout>
      <Home>
        <SEO title='Home' />
        <Home.Header>
          <H1>Lorem Ipsum</H1>
          <DiagonalBody />
        </Home.Header>
        <Home.Body>
          <ErrorBoundary error={error}>
            {loading ? (
              <Loader color='dark' />
            ) : (
              <FeaturedProducts products={data.products} />
            )}
          </ErrorBoundary>
          <SocialMedia />
        </Home.Body>
      </Home>
    </Layout>
  )
}

export default HomePage

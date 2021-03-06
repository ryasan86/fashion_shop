import React from 'react'
import Layout from '../../layouts/global-layout'

import SEO from '../../components/seo'
import Signin from '../../components/signin'
import { EMAIL } from '../../types/auth-field-types'

const RequestResetPage: React.StatelessComponent = props => (
    <Layout>
        <SEO title='Request Password Reset' />
        <Signin {...props} chosenFields={[EMAIL]} isRequestReset />
    </Layout>
)

export default RequestResetPage

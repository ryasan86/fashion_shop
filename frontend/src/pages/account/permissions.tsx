import React from 'react'

import Layout from '../../layouts/global-layout'
import AccountLayout from '../../layouts/account-layout'
import SEO from '../../components/seo'
import Permissions from '../../components/permissions'

const PermissionsPage: React.StatelessComponent = () => (
    <Layout>
        <AccountLayout>
            <SEO title='Permissions' />
            <Permissions />
        </AccountLayout>
    </Layout>
)

export default PermissionsPage

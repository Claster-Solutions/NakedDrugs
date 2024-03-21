import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import React from 'react'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'
import Filter from '../components/filter'
import ProductsListPage from '../components/productsListPage'

export default async function Page() {
    return (
        <>
            <Navbar />
            <ContentWrapper type="default">
                <ProductsListPage category="all" />
            </ContentWrapper>
            {/* <Footer /> */}
        </>
    )
}

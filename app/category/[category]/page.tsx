import React from 'react'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'
import Navbar from '@/app/components/navbar/navbar'
import ContentWrapper from '@/app/components/contentWrapper'
import Filter from '../../components/filter'
import { categoryOptions } from '@/types-exp'
import ProductsListPage from '@/app/components/productsListPage'

export async function generateStaticParams() {
    return categoryOptions.map((category) => {
        return {
            category: category,
        }
    })
}

export default async function Page({ params }: { params: { category: Category } }) {
    return (
        <>
            <Navbar />
            <ContentWrapper type="default">
                <ProductsListPage category={params.category} />
            </ContentWrapper>
            {/* <Footer /> */}
        </>
    )
}

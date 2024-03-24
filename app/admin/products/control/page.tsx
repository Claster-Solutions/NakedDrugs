'use client'
import React, { useState } from 'react'
import ContentWrapper from '@/app/components/contentWrapper'
import ObjectRoot from './components/objectRoot'
// import { Product } from '@/app/types'

const Page = () => {
    const [product, setProduct] = useState<undefined | Product>(undefined)

    return (
        <ContentWrapper type="default">
            <ObjectRoot />
            <div>a</div>
        </ContentWrapper>
    )
}

export default Page

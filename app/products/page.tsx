import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import React from 'react'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'

const Page = () => (
    <>
        <Navbar />
        <ContentWrapper type="default">
            <Component />
        </ContentWrapper>
        <Footer />
    </>
)
export default Page

const Component = async () => {
    const products = await fb.getAllProducts()
    console.log(products)
    return (
        <div className="">
            <h1 className="h1">products</h1>
            <div className=" flex flex-row gap-8">
                {products.map((product, index) => {
                    return (
                        <Link
                            key={index}
                            href={`/products/${product.id}`}
                            className=" w-1/4 overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl"
                        >
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].alt}
                                className="object-cover"
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

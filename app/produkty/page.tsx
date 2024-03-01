import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import React from 'react'
import Kratom from '@/public/images/placeholder.png'
import { Products } from './data'
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

const Component = () => {
    return (
        <div className="">
            <h1 className="h1">Produkty</h1>
            <div className=" flex flex-row gap-8">
                {Products.map((product, index) => {
                    return (
                        <Link
                            href={`/produkty/${product.id}`}
                            className=" w-1/4 overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl"
                        >
                            <img
                                src={Kratom.src}
                                alt="obrázek produktu - kratom"
                                className="object-cover"
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

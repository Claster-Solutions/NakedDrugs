import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import React from 'react'
import Kratom from './kratom.webp'
import { Products } from './data'

const Page = () => (
    <>
        <Navbar />
        <ContentWrapper type="none">
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
                        <div className="w-1/4 overflow-hidden  rounded-3xl border-4 border-solid border-white  shadow-sm">
                            <img
                                src={Kratom.src}
                                alt="obrázek produktu - kratom"
                                className="object-cover"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

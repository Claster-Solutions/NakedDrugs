import Image from 'next/image'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import ContentWrapper from './components/contentWrapper'
import HeroBanner from './main/heroBanner/heroBanner'
import WhyUsBanner from './main/whyUsBanner/whyUsBanner'
import ProductBanner from './main/productBanner/productBanner'

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
            <HeroBanner />
            <WhyUsBanner />
            <ProductBanner />
        </div>
    )
}

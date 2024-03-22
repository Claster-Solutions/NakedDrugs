import Image from 'next/image'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import ContentWrapper from './components/contentWrapper'
import HeroBanner from './main/heroBanner/heroBanner'
import WhyUsBanner from './main/whyUsBanner/whyUsBanner'
import BlogBanner from './main/blogBanner/blogBanner'
import fb from './tools/firebase/queries'

const Page = () => (
    <>
        <Navbar />
        <ContentWrapper page type="default">
            <Component />
        </ContentWrapper>
        <Footer />
    </>
)
export default Page

const Component = async () => {
    const blogEvent = await fb.getLastBlogLimited(1)
    return (
        <div className="">
            <HeroBanner />
            <WhyUsBanner />
            <BlogBanner Blog={blogEvent} />
        </div>
    )
}

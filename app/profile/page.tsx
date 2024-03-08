import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import User from './user'
import Link from 'next/link'

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
        <div>
            <h1>User Profile</h1>
            <User />
            <Link href={'/edit'}>Edit Profile</Link>
        </div>
    )
}

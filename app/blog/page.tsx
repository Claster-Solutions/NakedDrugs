import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'

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
        <div>
            <div>
                <img src="" alt="" />
                <h2></h2>
                <p></p>
            </div>
        </div>
    )
}

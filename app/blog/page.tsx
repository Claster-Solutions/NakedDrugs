import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import ContentFormatter from '../contentFormatter/contentFormatter'
import fb from '../tools/firebase/queries'

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
    const allblog = await fb.getAllBlogs()

    return (
        <div>
            <h1>BLOG</h1>
            {allblog.map((blog, index) => (
                <div></div>
                //return <h2 key={index}>{blog.categoryName}</h2>
            ))}

            {/* {blog.map((blog, index) => (
                <div key={index}>
                    <h2>{blog.categoryName}</h2>
                </div>
            ))} */}
        </div>
    )
}

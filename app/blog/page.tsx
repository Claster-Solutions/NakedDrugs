import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import ContentFormatter from '../contentFormatter/contentFormatter'
import fb from '../tools/firebase/queries'
import Blogcart from './components/blogcart'
import YearDropdown from './components/yearDropdown'

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
                <>
                    <YearDropdown key={index} blogs={blog} index={0} />
                    <div className="bg-primary-blue_line h-[0.5px] w-full md:w-4/12" />
                </>
            ))}
        </div>
    )
}

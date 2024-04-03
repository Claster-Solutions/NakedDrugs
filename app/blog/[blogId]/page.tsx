import ContentWrapper from '@/app/components/contentWrapper'
import Footer from '@/app/components/footer/footer'
import Navbar from '@/app/components/navbar/navbar'
import ContentFormatter from '@/app/contentFormatter/contentFormatter'
import fb from '@/app/tools/firebase/queries'
import { format } from '@/app/tools/format/format'

export async function generateStaticParams() {
    const blogs = await fb.getAllBlogs()

    //* Return array of objects with eventId
    const result = blogs.map((category) => {
        return category.blogs.map((event) => {
            return {
                blogId: event.id,
            }
        })
    })
    return result.flat()
}

const Page = async ({ params }: { params: { blogId: string } }) => (
    <>
        <Navbar />
        <ContentWrapper type="article">
            <Content blogId={params.blogId} />
        </ContentWrapper>

        <Footer />
    </>
)
export default Page

interface Props {
    blogId: string
}

const Content = async (p: Props) => {
    let blog = await fb.getBlog(p.blogId)
    const date = new Date(Number(blog.date))
    return (
        <div>
            <h1 className=" text-5xl font-semibold tracking-wide">{blog.title}</h1>
            <p className="text-xl font-thin">{format.dateShort(date)}</p>
            <ContentFormatter content={blog.content} />
        </div>
    )
}

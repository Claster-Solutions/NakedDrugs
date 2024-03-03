import ContentWrapper from '@/app/components/contentWrapper'
import Footer from '@/app/components/footer/footer'
import Navbar from '@/app/components/navbar/navbar'
import ContentFormatter from '@/app/contentFormatter/contentFormatter'
import fb from '@/app/tools/firebase/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format } from '@/app/tools/format/format'

// export async function generateMetadata({
//     params,
// }: {
//     params: { blogId: string }
// }): Promise<Metadata> {
//     let event = await fb.getBlog(params.blogId)

//     //* If event is not in important category, get it from db
//     if (!event) {
//         event = await fb.getBlog(params.blogId)
//     }
//     if (!event) {
//         return notFound()
//     }

//     return {
//         title: event.title,
//         description: event.description,
//         openGraph: {
//             type: 'article',
//             url: 'https://atletika-pardubice.cz/brand/banner.webp',
//             title: event.title,
//             description: event.description,
//             images: [
//                 {
//                     url: fb.getImage(event.thrumbnailImageId),
//                     alt: `Title image`,
//                 },
//             ],
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: event.title,
//             description: event.description,
//             images: [fb.getImage(event.thrumbnailImageId)],
//         },
//     }
// }

export async function generateStaticParams() {
    const blogs = await fb.getAllBlogs()

    //* Return array of objects with eventId
    const result = blogs.map((category) => {
        return category.blogs.map((event) => {
            return {
                eventId: event.id,
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
            <h1 className=" text-5xl font-semibold uppercase tracking-wide">
                {blog.title}
            </h1>
            <p>{format.dateShort(date)}</p>
            <ContentFormatter content={blog.content} />
        </div>
    )
}
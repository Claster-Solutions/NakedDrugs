import ContentFormatter from '@/app/contentFormatter/contentFormatter'
import { format } from '@/app/tools/format/format'
import Blog from '@/public/images/kratom_placeholder.webp'
import Link from 'next/link'

interface Props {
    Blog: BlogEvent[]
}
export default function BlogBanner(p: Props) {
    const date = new Date(Number(p.Blog[0].date))
    return (
        <div className="mb-4">
            {p.Blog.map((blog, index) => {
                return (
                    <Link
                        key={index}
                        href={`/blog/${blog.id}`}
                        className="justify-bettween flex  w-full flex-row  rounded-xl"
                    >
                        <img
                            src={Blog.src}
                            alt="obrázek productu - kratom"
                            className="h-3/12 w-5/12 rounded-lg object-cover"
                        />
                        <div className="ml-10 flex flex-col ">
                            <div className="flex items-center gap-4  ">
                                <h4 className=" text-3xl font-semibold ">{blog.title}</h4>
                                <p className=" font-light">{format.dateShort(date)}</p>
                            </div>

                            <p className="p-1">{blog.description}</p>
                            <div className="bg-primary-hades-main ml-0 mt-4 flex h-10 w-4/12 items-center justify-center rounded text-white">
                                <p className=" font-light">Číst dále</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

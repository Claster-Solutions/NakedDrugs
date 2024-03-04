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
    <div className="flex flex-col items-center justify-evenly">
      {p.Blog.map((blog, index) => {
        return (
          <Link
            key={index}
            href={`/blog/${blog.id}`}
            className="mx-[7%] flex flex-row  rounded-xl"
          >
            <img
              //  src={blog.thrumbnailImageId}
              src={Blog.src}
              alt="obrázek produktu - kratom"
              className="h-3/12 w-5/12 rounded-lg object-cover"
            />
            <div className="ml-10 flex flex-col ">
              <div className="flex items-center gap-4  ">
                <p className=" p-2 text-2xl font-semibold ">
                  {blog.title}
                </p>
                <p className=" font-light">{format.dateShort(date)}</p>
              </div>

              <p className="p-1">{blog.description}</p>
              <Link
                href={`/blog/${blog.id}`}
                className="ml-0 mt-4 flex h-10 w-4/12 items-center justify-center rounded bg-primary-hades_main text-white"
              >
                <p className=" font-light">Číst dále</p>
              </Link>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

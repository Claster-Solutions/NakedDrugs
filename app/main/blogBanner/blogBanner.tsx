import Link from 'next/link'

interface Props {
    Blog: BlogEvent[]
}
export default function blogBanner(p: Props) {
    return (
        <div>
            {' '}
            {p.Blog.map((blog, index) => {
                return (
                    <Link
                        href={`/blog/${blog.id}`}
                        className="w-1/4 overflow-hidden rounded-3xl border-4 border-solid border-white "
                    >
                        <img
                            src={blog.thrumbnailImageId}
                            alt="obrázek produktu - kratom"
                            className="object-cover"
                        />
                    </Link>
                )
            })}
        </div>
    )
}

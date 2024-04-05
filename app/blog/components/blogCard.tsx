import Link from 'next/link'
import image from '@/public/images/placeholder.png'
import React from 'react'
import { format } from '@/app/tools/format/format'

interface Props {
    blog: BlogEvent
}
export default function Blogcard(p: Props) {
    const date = new Date(Number(p.blog.date))
    return (
        <Link
            href={`/blog/${p.blog.id} `}
            key={p.blog.id}
            className="my-6 flex max-h-52 min-h-40 flex-row items-center justify-between rounded-xl bg-white shadow-lg hover:shadow-xl"
        >
            <div className="w-4/12 ">
                <img className="h-full w-auto object-contain" src={image.src}></img>
            </div>
            <div className=" ml-4 flex w-full flex-col items-start gap-2">
                <Link href={`/blog/${p.blog.id}`} className="text-2xl font-semibold tracking-wide">
                    {p.blog.title}
                </Link>
                <div className="m-0 flex flex-col ">
                    <p>{`${p.blog.description.substring(0, 100)}...`} </p>

                    <p>{format.dateShort(date)}</p>
                </div>
            </div>
        </Link>
    )
}

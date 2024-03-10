import Link from 'next/link'
import image from '@/public/images/placeholder.png'
import React from 'react'
import { format } from '@/app/tools/format/format'

interface Props {
    blog: BlogEvent
}
export default function BlogCard(p: Props) {
    const date = new Date(Number(p.blog.date))
    return (
        <div className="m-4 flex max-h-56 min-h-40 flex-row justify-between rounded-xl bg-white shadow-lg hover:shadow-xl">
            <div className="w-4/12 ">
                <img className="h-full w-auto object-contain" src={image.src}></img>
            </div>
            <div className="flex w-full flex-col items-start">
                <Link href={`/blog/${p.blog.id}`} className="text-xl font-bold">
                    {p.blog.title}
                </Link>
                <div className="m-4 flex flex-row ">
                    <p>{p.blog.description.substring(0, 100)} </p>
                    <p>{format.dateShort(date)}</p>
                </div>
            </div>
        </div>
    )
}

'use client'
import React from 'react'
import BlogCard from './blogCard'

interface Props {
    blogs: AllBlogs
    index: number
}

export default function YearDropdown(p: Props) {
    const [open, setOpen] = React.useState(p.index > 0 && p.index < 3 ? true : false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div className="transition-max-height">
            <div onClick={handleClick} className="flex cursor-pointer items-center gap-4">
                <h1 className="text-primary-blue text-2xl font-medium">
                    {p.blogs.categoryName}
                </h1>
            </div>

            <div
                className={`${
                    open ? ' max-h-full' : 'max-h-0'
                } transition-max-height overflow-hidden`}
            >
                {p.blogs.blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                ))}
            </div>
        </div>
    )
}

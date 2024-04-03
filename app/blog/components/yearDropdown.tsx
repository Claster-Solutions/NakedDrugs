'use client'
import React from 'react'
import Blogcard from './blogCard'

interface Props {
    blogs: AllBlogs
    index: number
}

export default function YearDropdown(p: Props) {
    // const [open, setOpen] = React.useState(p.index > 0 && p.index < 3 ? true : false)

    // const handleClick = () => {
    //     setOpen(!open)
    // }

    return (
        <div className="transition-max-height">
            {/* <div onClick={handleClick} className="flex cursor-pointer items-center gap-4">
                <h1 className=" text-xl font-medium">{p.blogs.categoryName}</h1>
            </div> */}
            {/* ${open ? ' max-h-0' : 'max-h-full'} was in div under */}
            <div className={` transition-max-height overflow-hidden`}>
                {p.blogs.blogs.map((blog, index) => (
                    <Blogcard key={index} blog={blog} />
                ))}
            </div>
        </div>
    )
}

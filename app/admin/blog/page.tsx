'use client'
import React, { useState, useEffect } from 'react'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'

const ObjectRoot = () => {
    const [blogs, setBlogs] = useState<AllBlogs[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fb.getAllBlogs()
                setBlogs(categoriesData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className=" text-primary-blue text-5xl font-semibold uppercase">BLOG</h1>
            <Link href="/admin/blog/control" className="text-3xl uppercase underline">
                Add new
            </Link>
            {blogs.map((blog, index) => (
                <div key={index}>{blog.categoryName}</div>
                // <DropDownYear category={category} key={index} index={index} />
            ))}
            <div className="sup h-20" />
        </div>
    )
}

export default ObjectRoot

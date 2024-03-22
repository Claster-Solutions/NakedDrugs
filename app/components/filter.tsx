import { categoryOptions } from '@/types-exp'
import Link from 'next/link'
import React from 'react'

interface Props {
    category: Category
}

export default function Filter(p: Props) {
    return (
        <div>
            <h2>Filter</h2>
            <div className="flex flex-col">
                {categoryOptions.map((option, index) => {
                    return (
                        <Link href={`/category/${option}`} key={index} className="flex items-center gap-2">
                            {p.category === option ? (
                                <div className="h-2 w-2 rounded-full bg-black"></div>
                            ) : (
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                            )}
                            <p className="capitalize">{option}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

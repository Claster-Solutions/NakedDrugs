import React from 'react'

interface Props {
    data: ContentList
}

export default function ContentList(p: Props) {
    return (
        <ul className="open-sans mx-10 my-4 list-disc space-y-3 text-sm font-light md:w-9/12">
            {p.data.items.map((item, index) => {
                return <li key={index}>{item}</li>
            })}
        </ul>
    )
}

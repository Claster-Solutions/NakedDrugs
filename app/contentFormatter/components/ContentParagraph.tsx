import React from 'react'

interface Props {
    data: ContentParagraph
}

export default function ContentParagraph(p: Props) {
    return (
        <p className="open-sans text-primary-black mb-3 mt-4 text-justify text-sm font-light md:w-9/12">
            {p.data.text}
        </p>
    )
}

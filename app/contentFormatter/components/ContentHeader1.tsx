import React from 'react'

interface Props {
    data: ContentHeader1
}

export default function ContentHeader1(p: Props) {
    return <h2 className="text-primary-blue text-5xl font-medium">{p.data.text}</h2>
}

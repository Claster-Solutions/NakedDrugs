import React from 'react'

interface Props {
    children: React.ReactNode
    type: 'none' | 'default' | 'article'
    tags?: string
    page?: boolean
    id?: string
}

export default function ContentWrapper(p: Props) {
    return (
        <div id={p.id} className={`${getStyle(p.type)} ${p.tags} ${p.page ? 'min-h-[80vh]' : ''}`}>
            {p.children}
        </div>
    )
}

const getStyle = (type: string) => {
    switch (type) {
        case 'none':
            return ''
        case 'default':
            return 'px-6 md:px-28'
        case 'article':
            return 'px-12 md:px-40'
        default:
            return ''
    }
}

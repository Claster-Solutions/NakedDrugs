import React from 'react'

interface Props {
    children: React.ReactNode
    type: 'none' | 'default' | 'article'
    tags?: string
}

export default function ContentWrapper(p: Props) {
    return <div className={`${getStyle(p.type)} ${p.tags}`}>{p.children}</div>
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

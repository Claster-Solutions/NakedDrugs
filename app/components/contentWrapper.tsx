import React from 'react'

interface Props {
    children: React.ReactNode
    type: 'none' | 'default' | 'article'
    tags?: string
    verticalPadding?: boolean //? Default true
}

export default function ContentWrapper(p: Props) {
    const verticalPadding = p.verticalPadding ?? true
    return (
        <div
            className={`oswald bg-primary-gray_background ${getStyle(
                p.type,
                verticalPadding,
            )} ${p.tags}`}
        >
            {p.children}
        </div>
    )
}

const getStyle = (type: Props['type'], verticalPadding: boolean) => {
    if (verticalPadding) {
        switch (type) {
            case 'none':
                return 'min-h-[70vh]'
            case 'default':
                return 'px-6 md:px-36 min-h-[70vh] py-16'
            case 'article':
                return 'px-12 md:px-56 min-h-[70vh] py-16'
            default:
                return ''
        }
    } else {
        switch (type) {
            case 'none':
                return ''
            case 'default':
                return 'px-6 md:px-36'
            case 'article':
                return 'px-12 md:px-56'
            default:
                return ''
        }
    }
}

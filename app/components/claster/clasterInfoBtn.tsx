'use client'
import React, { useState } from 'react'

interface Props {
    title?: string
    text: string
}

export default function ClasterInfoBtn(p: Props) {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <div
            className="relative flex w-min justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`border-1 absolute bottom-[150%] w-[25vw] rounded border-solid
                    border-hades bg-white px-4 py-3 text-hades
                    ${isHovered ? '' : 'pointer-events-none opacity-0'}
                `}
            >
                <p className="pb-3 font-medium">{p.title}</p>
                <p className="f-1">{p.text}</p>
            </div>
            <div className="h-4 w-4">
                <img src="/icons/infoBtn.svg" />
            </div>
        </div>
    )
}

'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Burger() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    return (
        <div onClick={handleClick} className="flex h-full cursor-pointer flex-col items-center pl-4">
            <div className="flex h-full items-center gap-3  pt-1">
                <img src={'/icons/burger.svg'} className="h-6 w-6 rounded-full" rel="nofollow" />
            </div>

            <div
                className={`absolute mt-16 w-48 shadow-custom duration-300 ${
                    isOpen ? 'max-h-screen' : 'pointer-events-none max-h-0 opacity-0'
                }`}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex flex-col rounded bg-white shadow-custom">
                    <Link
                        href={'/products'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src={'/icons/tray-stacked.svg'} className="h-6 w-6 rounded-full" />
                        <p>Products</p>
                    </Link>
                    <div className="h-[1px] w-full bg-hades-light" />
                    <Link
                        href={'/blog'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src={'/icons/house.svg'} className="h-6 w-6 rounded-full" />
                        <p>Blog</p>
                    </Link>
                    <div className="h-[1px] w-full bg-hades-light" />

                    <Link
                        href={'/contact'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src="/icons/cooperation.svg" className="h-6 w-6" />
                        <p>Contact</p>
                    </Link>

                    <div className="h-[1px] w-full bg-hades-light" />

                    <Link
                        href={'/about'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src="/icons/about.svg" className="h-6 w-6" />
                        <p>About Us</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

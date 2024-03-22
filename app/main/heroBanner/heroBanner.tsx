import Link from 'next/link'
import React from 'react'
import ProductImage from '@/public/images/kratom_placeholder.webp'

export default function HeroBanner() {
    return (
        <div className="flex items-center justify-between py-36">
            <div className=" flex w-1/2 flex-col">
                <div className="flex items-center">
                    <p className="rounded-xl pb-4 text-4xl font-bold tracking-wide text-black">
                        Buy me! Bro or i dont know maybe some description rather
                    </p>
                </div>
                <Link
                    className="bg-primary-hades-main ml-0 flex h-10 w-3/12 items-center justify-center rounded text-white"
                    href={'/products'}
                >
                    <p className="font-light">Koupit</p>
                </Link>
            </div>
            <img className="w-6/12 rounded-lg object-cover" src={ProductImage.src} alt="banner kratom vesmír"></img>
            {/* need to change this  */}{' '}
        </div>
    )
}

import Link from 'next/link'
import React from 'react'
import ProductImage from '@/public/images/kratom_placeholder.webp'

export default function HeroBanner() {
    return (
        <div className="flex items-center justify-evenly py-6">
            <div className=" flex w-1/3 flex-col">
                <div className="flex items-center">
                    <p className="rounded-xl p-4 text-3xl font-bold tracking-wide text-black">
                        Buy me! Bro or i dont know maybe some description rather
                    </p>
                </div>
                <Link
                    className="bg-primary-hades_main ml-4 flex h-8 w-3/12 items-center justify-center rounded text-white"
                    href={'/produkty'}
                >
                    <p className="font-light">Koupit</p>
                </Link>
            </div>
            <img
                className="w-4/12 rounded-lg object-cover"
                src={ProductImage.src}
                alt="banner kratom vesmír"
            ></img>
            {/* need to change this  */}{' '}
        </div>
    )
}

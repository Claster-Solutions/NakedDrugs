import Link from 'next/link'
import React from 'react'
import BannerImage from '@/public/images/placeholder.png'

export default function HeroBanner() {
    return (
        <Link href={'/'} className="relative flex items-center justify-center py-6">
            <img
                className=" rounded-3xl border border-black bg-white object-cover shadow-xl hover:shadow-2xl"
                src={BannerImage.src}
                alt="banner kratom vesmír"
            ></img>
            {/* need to change this  */}{' '}
            <div className=" absolute bottom-20 left-0 right-0 top-0 flex items-end justify-center">
                <div className="rounded-xl bg-white bg-opacity-0 p-4 text-5xl font-bold tracking-wider text-black">
                    Buy me!
                </div>
            </div>
        </Link>
    )
}

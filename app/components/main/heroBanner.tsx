import Link from 'next/link'
import React from 'react'
import BannerImage from '@/public/banners/hero-banner-image.jpeg'

export default function HeroBanner() {
    return (
        <Link
            href={'/'}
            className="bg-primary-gray_background relative flex h-full w-full items-center justify-center py-6"
        >
            <img
                className="glowing-border hover:animate-glow w-[85%] rounded-3xl border border-black object-cover"
                src={BannerImage.src}
                alt="banner kratom vesmír"
            ></img>
            <div className=" absolute bottom-20 left-0 right-0 top-0 flex items-end justify-center">
                <div className="rounded-xl bg-white bg-opacity-40 p-4 text-2xl tracking-wider text-black">
                    Same effect no taste
                </div>
            </div>
        </Link>
    )
}

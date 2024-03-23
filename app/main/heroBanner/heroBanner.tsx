import Link from 'next/link'
import React from 'react'
import ProductImage from '@/public/images/kratom_placeholder.webp'
const HeroBanner = () => (
    <>
        <Desktop />
        <Mobile />
    </>
)
export default HeroBanner

function Desktop() {
    return (
        <Link href={'/products/KratomBlue'} className=" hidden items-center justify-between gap-4 py-16 md:flex">
            <div className=" flex w-1/2 flex-col">
                <div className="flex items-center">
                    <h2 className="rounded-xl pb-4 text-4xl font-bold tracking-wide text-black">
                        Hodně muziky za málo peněz. Zkuste náš Zelený Kratom.
                    </h2>
                </div>
                <Link
                    className="bg-primary-hades-main ml-0 flex h-10 w-3/12 items-center justify-center rounded text-white"
                    href={'/products'}
                >
                    <p className="font-light">Koupit</p>
                </Link>
            </div>
            <img className="w-6/12 rounded-lg object-cover" src={ProductImage.src} alt="banner kratom vesmír"></img>
        </Link>
    )
}
function Mobile() {
    return (
        <div className=" flex flex-col items-center justify-center md:hidden">
            <img className="" src={ProductImage.src} alt="banner kratom vesmír" />
            <Link
                className="flex h-8 w-[50vw] items-center justify-center rounded-xl border border-solid"
                href={'/products/kratomBlue'}
            >
                <p>Vyzkoušej mě!</p>
            </Link>
        </div>
    )
}

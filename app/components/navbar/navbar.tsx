'use client'
import cartIcon from '@/public/icons/cart.svg'
import Image from 'next/image'
import Logo from '@/public/brand/emoji-logo.jpg'
import Link from 'next/link'
import ContentWrapper from '../contentWrapper'
import React from 'react'
import { mainPagesList } from './data'
import NavbarBtn from './button'
import User from './user'
import fb from '@/app/tools/firebase/queries'

const Navbar = () => (
    <div className="z-50">
        <div className="sup h-32 w-full" />
        <ContentWrapper type="default" tags="bg-white text-black shadow-xl fixed w-full top-0 left-0 z-50">
            <Component />
        </ContentWrapper>
    </div>
)
export default Navbar

const Component = () => {
    return (
        <>
            <div className="hidden md:block">{Desktop()}</div>
            <div className="block md:hidden">{Mobile()}</div>
        </>
    )
}

const Desktop = () => {
    return (
        <div className="flex h-32 w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full flex-row items-center justify-between">
                <Link href="/" className="w-14">
                    <img
                        src={Logo.src}
                        alt="Naked drugs logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Link>
                <input className="bg-primary-hades-light h-8 w-[35%] rounded-md" type="text" />
                <User />

                <Link className="flex gap-2" href={'/cart'}>
                    <img src={cartIcon.src} alt="Instagram icon" width={18} height={18} />
                    <p>Košík</p>
                </Link>
            </div>
            <div className="flex w-full flex-row justify-between">
                {mainPagesList.map((page, index) => {
                    return <NavbarBtn key={index} title={page.name} link={page.url} />
                })}
            </div>
            <div className="flex w-full items-center justify-between gap-4">
                <div className="sup" />
            </div>
        </div>
    )
}
const Mobile = () => {
    // const [isOpen, setIsOpen] = useState(false)

    // const allLinks = [...mainPagesList, ...dropdownMenuItems]

    // return (
    //     <div className="transition-max-height  relative flex h-16 items-center justify-between">
    //         <Link href="/" className="w-16">
    //             <Image
    //                 src={logo}
    //                 alt="Hvezda athlet logo"
    //                 width="0"
    //                 height="0"
    //                 sizes="100vw"
    //                 style={{ width: '100%', height: 'auto' }}
    //             />
    //         </Link>
    //         <button
    //             onClick={() => {
    //                 setIsOpen(!isOpen)
    //             }}
    //             type="button"
    //             aria-label="Main menu"
    //         >
    //             {isOpen ? openBurger() : closedBurger()}
    //         </button>
    //         <div
    //             className={`${
    //                 isOpen ? 'max-h-screen' : 'pointer-events-none max-h-0 opacity-0'
    //             } bg-navbar-gradient fixed left-0 top-16 z-50 flex h-[100vh] w-full flex-col items-center`}
    //         >
    //             <div className="flex h-[80%] w-full flex-col gap-6 overflow-y-scroll px-6 py-6">
    //                 {allLinks.map((page, index) => {
    //                     return (
    //                         <Link
    //                             key={index}
    //                             href={page.url}
    //                             className={`open-sans  text-primary-white text-lg font-light ${
    //                                 index === allLinks.length - 1 && 'pb-24'
    //                             }`}
    //                         >
    //                             {page.name}
    //                         </Link>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // )
    return <div>xd</div>
}

const closedBurger = () => (
    <svg className="h-8 w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            className="text-primary-white fill-current"
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const openBurger = () => (
    <svg className="h-8 w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            className="text-primary-white fill-current"
            d="M6 6L18 18M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

import React from 'react'
import ContentWrapper from '../contentWrapper'
import Link from 'next/link'
import Burger from './components/burger'
import User from './components/user'
import NavbarController from '@/app/tools/scripts/navbarController'
import Search from './components/search'
import fb from '@/app/tools/firebase/queries'

export default async function Nabar() {
    return (
        <ContentWrapper
            id="navbar"
            type="default"
            tags="w-screen fixed right-0 top-0 shadow-md transition-all duration-750 ease-in-out bg-white"
        >
            <NavbarPC />
        </ContentWrapper>
    )
}

const NavbarPC = async () => {
    const products = await fb.getAllProducts()

    return (
        <div className="flex h-16 w-full items-center justify-between">
            <div className="flex h-full w-6/12 items-center gap-10">
                <Link href={'/'} className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-black" />
                    <p>Logo</p>
                </Link>

                <Search products={products} />
            </div>

            <div className="flex h-full w-6/12 items-center justify-end">
                <User />
                <Burger />
            </div>
            <NavbarController />
        </div>
    )
}

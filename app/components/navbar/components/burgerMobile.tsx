'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../contentWrapper'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { clasterConfig } from '@/claster-confing'

export default function BurgerMobile() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const [userName, setUserName] = useState<string | null>(null)
    const [userPhoto, setUserPhoto] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fb.getUser(user.uid)
                if (!userData) return

                setUser(userData)
                setUserName(userData.name)
                setUserPhoto(userData.photoURL)

                localStorage.setItem('userName', userData.name)
                localStorage.setItem('userPhoto', userData.photoURL)
            }
        })
    }, [])

    useEffect(() => {
        setUserName(localStorage.getItem('userName'))
        setUserPhoto(localStorage.getItem('userPhoto'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('userPhoto')
        setUserName(null)
        setUserPhoto(null)
        setUser(null)
        auth.signOut()
        handleClick()
    }

    return (
        <div className="flex h-full cursor-pointer flex-col items-center pl-4">
            <button onClick={handleClick} className="flex h-full items-center gap-3  pt-1">
                <img src={'/icons/burger.svg'} className="h-10 w-10 rounded-full" rel="nofollow" />
            </button>

            <div
                className={`absolute left-0 mt-16 h-[95vh] w-full bg-white duration-200 ${
                    isOpen ? 'max-h-screen' : 'pointer-events-none max-h-0 opacity-0'
                }`}
            >
                <ContentWrapper type="default">
                    <div className="flex flex-col rounded bg-white pt-6">
                        <div className="f4 pt-6 font-semibold">
                            <img
                                src={userPhoto || `${clasterConfig.websiteRootUrl}/icons/user.svg`}
                                className="h-16 w-16 rounded-full"
                                rel="nofollow"
                            />
                            <p>{userName || 'User'}</p>
                        </div>
                        {!userName && (
                            <Link
                                href={'/log-in'}
                                className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                            >
                                <img src="/icons/login.svg" className="h-6 w-6" />
                                <p>Login</p>
                            </Link>
                        )}
                        {userName && (
                            <div>
                                <Link
                                    href={'/profile'}
                                    className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                                >
                                    <img src="/icons/user.svg" rel="nofollow" className="h-6 w-6" />
                                    <p>My Profile</p>
                                </Link>
                                <div className="h-[1px] w-full bg-hades-light" />

                                <Link
                                    href={'/cart'}
                                    className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                                >
                                    <img src="/icons/cart.svg" className="h-6 w-6" />
                                    <p>My Cart</p>
                                </Link>

                                <div className="h-[1px] w-full bg-hades-light" />

                                <Link
                                    href={'/liked'}
                                    className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                                >
                                    <img src="/icons/heart.svg" className="h-6 w-6" />
                                    <p>My Liked</p>
                                </Link>
                                <div className="h-[1px] w-full bg-hades-light" />
                                <Link
                                    href={'/orders'}
                                    className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                                >
                                    <img src={'/icons/orders.svg'} className="h-6 w-6 rounded-full" />
                                    <p>My Orders</p>
                                </Link>

                                <div className="h-[1px] w-full bg-hades-light" />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                                >
                                    <img src={'/icons/logout.svg'} className="h-6 w-6 rounded-full" />
                                    <p>Logout</p>
                                </button>
                            </div>
                        )}

                        <h3 className="f4 pt-6 font-semibold">Other</h3>
                        <Link
                            href={'/blog'}
                            className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                        >
                            <img src={'/icons/house.svg'} className="h-6 w-6 rounded-full" />
                            <p>Our Blog</p>
                        </Link>
                        <div className="h-[1px] w-full bg-hades-light" />

                        <Link
                            href={'/contact'}
                            className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                        >
                            <img src="/icons/cooperation.svg" className="h-6 w-6" />
                            <p>Cooperation</p>
                        </Link>

                        <div className="h-[1px] w-full bg-hades-light" />

                        <Link
                            href={'/about'}
                            className="flex items-center gap-3 rounded py-3 duration-0 hover:bg-hades-light"
                        >
                            <img src="/icons/about.svg" className="h-6 w-6" />
                            <p>About Us</p>
                        </Link>
                    </div>
                </ContentWrapper>
            </div>
        </div>
    )
}

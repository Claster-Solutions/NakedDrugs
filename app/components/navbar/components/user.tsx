'use client'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import clasterConfig from '@/claster-confing'
import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function User() {
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

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsOpen(false)
        }, 200)
    }

    return (
        <div onClick={handleClick} className="flex h-full cursor-pointer flex-col items-center px-4">
            <div className="flex h-full items-center gap-3">
                <img
                    src={userPhoto ? userPhoto : `${clasterConfig.websiteRootUrl}/icons/user.svg`}
                    className="h-6 w-6 rounded-full"
                    rel="nofollow"
                />
                <p>{userName ? userName : 'Login'}</p>
                <img src="/icons/arrowDown.svg" className={`duration-200 ${isOpen ? '' : 'rotate-180'}`} />
            </div>

            <div
                className={`absolute mt-16 w-48 shadow-custom duration-200 ${
                    isOpen ? 'max-h-screen' : 'pointer-events-none max-h-0 opacity-0'
                }`}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex flex-col rounded bg-white shadow-md">
                    <Link
                        href={'/profile'}
                        className="hover:bg-hades-light flex items-center gap-3 rounded p-3 duration-0"
                    >
                        <img src={'/icons/user.svg'} className="h-6 w-6 rounded-full" />
                        <p>My Profile</p>
                    </Link>
                    <div className="bg-hades-light h-[1px] w-full" />

                    <Link
                        href={'/orders'}
                        className="hover:bg-hades-light flex items-center gap-3 rounded p-3 duration-0"
                    >
                        <img src="/icons/orders.svg" className="h-6 w-6" />
                        <p>My Orders</p>
                    </Link>

                    <div className="bg-hades-light h-[1px] w-full" />
                    <Link
                        href={'/liked'}
                        className="hover:bg-hades-light flex items-center gap-3 rounded p-3 duration-0"
                    >
                        <img src="/icons/heart.svg" className="h-6 w-6" />
                        <p>My Liked</p>
                    </Link>
                    <div className="bg-hades-light h-[1px] w-full" />
                    <Link
                        href={'/cart'}
                        className="hover:bg-hades-light flex items-center gap-3 rounded p-3 duration-0"
                    >
                        <img src="/icons/cart.svg" className="h-6 w-6" />
                        <p>My Cart</p>
                    </Link>
                    <div className="bg-hades-light h-[1px] w-full" />
                    <Link
                        href={'/logout'}
                        className="hover:bg-hades-light flex items-center gap-3 rounded p-3 duration-0"
                    >
                        <img src="/icons/logout.svg" className="h-6 w-6" />
                        <p>Logout</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

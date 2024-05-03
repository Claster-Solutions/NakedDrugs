'use client'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { clasterConfig } from '@/claster-confing'
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
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src={'/icons/user.svg'} className="h-6 w-6 rounded-full" />
                        <p>Profil</p>
                    </Link>
                    <div className="h-[1px] w-full bg-hades-light" />

                    <Link
                        href={'/orders'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src="/icons/orders.svg" className="h-6 w-6" />
                        <p>Moje Objednávky</p>
                    </Link>

                    <div className="h-[1px] w-full bg-hades-light" />
                    <Link
                        href={'/liked'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src="/icons/heart.svg" className="h-6 w-6" />
                        <p>Oblíbené</p>
                    </Link>
                    <div className="h-[1px] w-full bg-hades-light" />
                    <Link
                        href={'/cart'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src="/icons/cart.svg" className="h-6 w-6" />
                        <p>Košík</p>
                    </Link>
                    <div className="h-[1px] w-full bg-hades-light" />
                    <Link
                        href={'/log-out'}
                        className="flex items-center gap-3 rounded p-3 duration-0 hover:bg-hades-light"
                    >
                        <img src="/icons/logout.svg" className="h-6 w-6" />
                        <p>Odhlásit se</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

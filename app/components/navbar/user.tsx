'use client'
import { auth } from '@/app/tools/firebase/main'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import ProfileIcon from '@/public/icons/user.svg'
import Link from 'next/link'

export default function User() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPhotoURL, setUserPhotoURL] = useState('')
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || user.email || 'User')
                setUserEmail(user.email || 'User')
                setUserPhotoURL(user.photoURL || '')
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })
    }, [])

    if (authenticated === null) {
        return (
            <Link className="flex flex-row items-center font-light" href={'/log-in'}>
                <img referrerPolicy="no-referrer" src={ProfileIcon.src} />
                <p>Log In</p>
            </Link>
        )
    }
    if (authenticated === false) {
        return (
            <Link className="flex flex-row items-center gap-2 font-light" href={'/log-in'}>
                <img referrerPolicy="no-referrer" src={ProfileIcon.src} />
                <p>Log In</p>
            </Link>
        )
    }
    return (
        <Link href={'/profile'} className=" flex flex-row gap-2 p-2">
            <img
                referrerPolicy="no-referrer"
                src={userPhotoURL}
                alt="User photo"
                className="rounded-xl"
                width={20}
                height={20}
            />
            <p className="text-xs font-light">{userName}</p>
        </Link>
    )
    /*return (
    <div className="bg-green">
      <p>{userEmail}</p>
      <p>{userName}</p>
      <img src={userPhotoURL} alt="User photo" width={18} height={18} />
      <button
        onClick={() => {
          //? log out
          signOut(auth)
        }}
      >
        Log out
      </button>
    </div>
  )*/
}

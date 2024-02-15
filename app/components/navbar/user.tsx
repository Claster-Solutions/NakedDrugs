'use client'
import { auth } from '@/firebase/main'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

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
        return <p className="bg-yellow">Loading...</p>
    }

    if (authenticated === false) {
        return <p className="bg-red">Not authenticated</p>
    }

    return (
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
    )
}

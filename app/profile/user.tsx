'use client'
import clasterConfig from '@/claster-confing'
import { auth } from '@/firebase/main'
import be from '@/firebase/queries'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

export default function User() {
    const [user, setUser] = useState<User | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const id = user.uid
                const userData = await be.getUser(id)
                if (!userData) {
                    return
                }
                setUser(userData)
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })
    }, [])

    const handleCopyReferalLink = () => {
        navigator.clipboard.writeText(
            `${clasterConfig.websiteRootUrl}/invite?user=${user?.id}`,
        )
    }

    if (authenticated === null) {
        return <p>Loading...</p>
    }

    if (authenticated === false) {
        return <p>Not authenticated</p>
    }

    return (
        <div>
            <p>id: {user?.id}</p>
            <p>name: {user?.name}</p>
            <p>email: {user?.email}</p>
            <img src={user?.photoURL} alt="User photo" width={18} height={18} />

            <p>Liked: </p>
            <div className="flex flex-col">
                {user?.liked.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item}</p>
                        </div>
                    )
                })}
            </div>

            <p>Referals: </p>
            <div className="flex flex-col">
                {user?.referals.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item}</p>
                        </div>
                    )
                })}
            </div>

            <p>Casrd length: {user?.card.length}</p>

            <h2>Referal link:</h2>
            <p>{`${clasterConfig.websiteRootUrl}/invite?user=${user?.id}`}</p>
            <button onClick={handleCopyReferalLink}>Copy link</button>
        </div>
    )
}

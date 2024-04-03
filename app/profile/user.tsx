'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import { clasterConfig } from '@/claster-confing'

export default function User() {
    const [user, setUser] = useState<User | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const id = user.uid
                const userData = await fb.getUser(id)
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
        navigator.clipboard.writeText(`${clasterConfig.websiteRootUrl}/invite?user=${user?.id}`)
    }

    const handleLogOut = () => {
        auth.signOut()
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
            <img
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt="User photo"
                width={18}
                height={18}
                onError={(e: any) => (e.target.src = '/icons/user.png')}
            />

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

            {/* <p>Casrd length: {user?.cart.length}</p> */}
            {/* length is not property of cart */}

            <button onClick={handleLogOut}>Log out</button>

            <h2>Referal link:</h2>
            <p>{`${clasterConfig.websiteRootUrl}/invite?user=${user?.id}`}</p>
            <button onClick={handleCopyReferalLink}>Copy link</button>
        </div>
    )
}

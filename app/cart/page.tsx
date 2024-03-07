'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'

export default function Page() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fb.getUser(user.uid)
                if (!userData) return
                setUser(userData)
            }
        })
    }, [])

    return (
        <div>
            <h1>Cart</h1>
            <p>User: {user?.name}</p>
            <div>
                {user?.cart.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.name}</p>
                            <p>
                                {item.price.volume} {item.price.price}
                            </p>
                            <p>{item.amount}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../tools/firebase/main'
import fb from '../../tools/firebase/queries'
import { clasterConfig } from '@/claster-confing'

export default function Liked() {
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

    if (authenticated === null) {
        return <p>Loading...</p>
    }

    if (authenticated === false) {
        return <p>Not authenticated</p>
    }
    if (user?.orders == null) return <p>No orders</p>

    return (
        <div className="flex w-2/3 flex-col items-center justify-center">
            <h2>{user?.name}</h2>

            <div className="flex">
                {user?.orders.map((order, index) => {
                    return (
                        <div key={index}>
                            <p>{order.id}</p>
                            <p>
                                {order.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{item.productName}</p>
                                            <p>{item.amount}</p>
                                        </div>
                                    )
                                })}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

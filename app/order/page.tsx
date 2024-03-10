'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'

export default function Page() {
    const [order, setOrder] = useState<Order | null>(null)
    const [error, setError] = useState<string | null>(null)

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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const orderId = urlParams.get('id')

        if (!orderId) {
            setError('No user id')
            return
        }

        if (!user) {
            setError('No user')
            return
        }

        const order = user.orders.find((order) => order.id === orderId)

        if (!order) {
            setError('Order not found')
            return
        }

        setOrder(order)
    }, [user])

    return (
        <div>
            <h1>Order</h1>

            <div className="flex flex-col">
                <p>Order ID: {order?.id}</p>
                <p>State: {order?.state}</p>
                <p>Date: {order?.date.toDateString()}</p>
                <p>Items:</p>
                <div className="flex flex-col">
                    {order?.items.map((item) => (
                        <div key={item.id} className="flex">
                            <img src={item.productImage} alt="" className="h-20 w-20" />
                            <p>{item.productName}</p>
                            <p>{item.amount}</p>
                            <p>
                                {item.price.price} - {item.price.volume}{' '}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

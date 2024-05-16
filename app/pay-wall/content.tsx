'use client'

import React, { useEffect, useState } from 'react'
import Pay from './pay'
import fb from '../tools/firebase/queries'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../tools/firebase/main'

interface Props {
    session: any
}

export default function Content(p: Props) {
    const [orderId, setOrderId] = useState<string | null>(null)
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
        const updateOrderSession = async () => {
            if (!user) return
            const link = window.location.href
            const orderId = link.split('orderId=')[1]

            const oldOrders = user.orders

            const currentOrder = oldOrders.find((order) => order.id === orderId)
            if (!currentOrder) return
            currentOrder.sessionId = p.session.id
            const newOrders = oldOrders.map((order) => (order.id === orderId ? currentOrder : order))

            await fb.updateUserOrders(user.id, newOrders)
            setOrderId(orderId)
        }

        updateOrderSession()
    }, [user])

    if (!orderId) return <div>Loading...</div>

    return <div>{p.session && <Pay session={p.session} />}</div>
}

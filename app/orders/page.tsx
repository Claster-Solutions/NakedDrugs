'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import Link from 'next/link'
import Footer from '../components/footer/footer'
import ContentWrapper from '../components/contentWrapper'
import Navbar from '../components/navbar/navbar'

export default function Page() {
    return (
        <>
            <Navbar />
            <ContentWrapper page type="default">
                <Component />
            </ContentWrapper>
            <Footer />
        </>
    )
}

function Component() {
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
            <h1>My orders</h1>
            <div className="flex flex-col gap-10">
                {user?.orders.map((order) => (
                    <Link href={`/order?id=${order.id}`} key={order.id} className="flex flex-col">
                        <p>Order ID: {order.id}</p>
                        <p>State: {order.state}</p>
                        <p>Date: {order.date.toDateString()}</p>
                        <p>Items:</p>
                        <div className="flex flex-col">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex">
                                    <img src={item.productImage} alt="" className="h-20 w-20" />
                                    <p>{item.productName}</p>
                                    <p>{item.amount}</p>
                                </div>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

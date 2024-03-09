'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import Link from 'next/link'
import { v4 } from 'uuid'

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

    const handleChangeAmount = async (productId: string, amount: number) => {
        if (!user) return
        if (amount < 1) return
        const newCart = user.cart.map((item) => {
            if (item.productId === productId) {
                item.amount = amount
            }
            return item
        })
        setUser({ ...user, cart: newCart })
        await fb.updateUserCart(user.id, newCart)
    }

    const handleCardItemDelete = async (productId: string) => {
        if (!user) return
        const newCart = user.cart.filter((item) => item.productId !== productId)
        setUser({ ...user, cart: newCart })
        await fb.updateUserCart(user.id, newCart)
    }

    return (
        <div>
            <h1>Cart</h1>
            <p>User: {user?.name}</p>
            <div className="flex flex-col gap-10">
                {user?.cart.map((item, index) => {
                    return (
                        <div key={index} className="z-0 bg-slate-300">
                            <img src={item.productImage} alt="alt" className="w-32" />
                            <Link href={`/products/${item.productId}`}>{item.productName}</Link>
                            <p>
                                {item.price.volume} {item.price.price}
                            </p>
                            <div className="z-10 flex items-center gap-5 bg-slate-500 p-3">
                                <button
                                    className="bg-slate-400 p-4"
                                    onClick={() => handleChangeAmount(item.productId, item.amount - 1)}
                                >
                                    -
                                </button>
                                <p>{item.amount}</p>
                                <button
                                    className="bg-slate-400 p-4"
                                    onClick={() => handleChangeAmount(item.productId, item.amount + 1)}
                                >
                                    +
                                </button>
                                <button
                                    className="bg-slate-400 p-4"
                                    onClick={() => handleCardItemDelete(item.productId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <Link href={'/purchase'}>Create order</Link>
            </div>
        </div>
    )
}

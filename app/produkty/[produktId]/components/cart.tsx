'use client'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

interface Props {
    productId: string
}

export default function Cart(p: Props) {
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

    const handleAddToCart = async () => {
        if (user === null) return

        const newCartItem: CartItem = {
            id: p.productId,
            quantity: 1,
            name: 'Product name',
            price: 100,
        }

        const newCart = [...user.cart, newCartItem]
        await fb.setUserCart(user.id, newCart)
    }

    return (
        <div>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    )
}

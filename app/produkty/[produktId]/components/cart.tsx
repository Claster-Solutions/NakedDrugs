'use client'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

interface Props {
    product: Product
    user: User | null
    price: ProductPrice
    amount: number
}

export default function Cart(p: Props) {
    const handleAddToCart = async () => {
        if (p.user === null) return
        const cartItem: CartItem = {
            name: p.product.name,
            id: p.product.id,
            price: p.price,
            amount: p.amount,
        }
        await fb.addCartItem(p.user.id, cartItem)
    }

    return (
        <div>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    )
}

'use client'
import fb from '@/app/tools/firebase/queries'
import React from 'react'
import { v4 } from 'uuid'

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
            id: v4(),
            productName: p.product.name,
            productId: p.product.id,
            price: p.price,
            amount: p.amount,
            productImage: p.product.images[0].url,
        }

        const newCart = p.user.cart.concat(cartItem)
        await fb.updateUserCart(p.user.id, newCart)
    }

    return (
        <div>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    )
}

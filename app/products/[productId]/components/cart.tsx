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
    const handleAddTocart = async () => {
        if (p.user === null) return
        const cartItem: cartItem = {
            id: v4(),
            productName: p.product.name,
            productId: p.product.id,
            price: p.price,
            amount: p.amount,
            productImage: p.product.images[0].url,
        }

        const newcart = p.user.cart.concat(cartItem)
        await fb.updateUsercart(p.user.id, newcart)
    }

    return (
        <div className="flex items-center justify-center">
            <button
                className="h-10 w-full rounded-lg  border border-solid  bg-hades-main p-0 text-sm font-light text-white"
                onClick={handleAddTocart}
            >
                Add to cart
            </button>
        </div>
    )
}

'use client'
import fb from '@/app/tools/firebase/queries'
import { reload } from 'firebase/auth'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
    user: User | null
    product: Product
}

export default function WriteReview(p: Props) {
    const [text, setText] = useState('')
    const [rate, setRate] = useState<1 | 2 | 3 | 4 | 5>(5)

    const handleReviewSubmit = async () => {
        if (!text) {
            alert('Please write a review')
            return
        }

        if (!p.user) {
            alert('Please login to write a review')
            return
        }

        const newReview: Review = {
            userId: p.user.id,
            name: p.user.name,
            photoURL: p.user.photoURL,
            date: new Date(),
            text,
            rate,
        }

        const updatedProduct: Product = {
            ...p.product,
            reviews: [newReview, ...p.product.reviews],
        }

        await fb.updateProduct(updatedProduct)
        window.location.reload()
    }

    const checkIfUserPurchasedItem = () => {
        if (!p.user) return false
        return p.user.orders.find(
            (order) => order.state === 'delivered' && order.items.find((item) => item.productId === p.product.id),
        )
    }

    if (!p.user) {
        return <div>You need to be logged in to write a review</div>
    }

    if (!checkIfUserPurchasedItem()) {
        return <div>You need to purchase this item to write a review</div>
    }

    return (
        <div>
            <h1>Write a review</h1>
            <div>
                <textarea className="bg-slate-300" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="flex gap-5">
                    <button onClick={() => setRate(1)}>1</button>
                    <button onClick={() => setRate(2)}>2</button>
                    <button onClick={() => setRate(3)}>3</button>
                    <button onClick={() => setRate(4)}>4</button>
                    <button onClick={() => setRate(5)}>5</button>
                </div>
                <div>
                    <button onClick={handleReviewSubmit}>Send</button>
                </div>
            </div>
        </div>
    )
}

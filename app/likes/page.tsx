'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'

export default function Page() {
    const [user, setUser] = useState<User | null>(null)
    const [likes, setLikes] = useState<Product[]>([])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fb.getUser(user.uid)
                if (!userData) return
                setUser(userData)

                const likedProducts = await fb.getProductsByIDs(userData.liked)
                setLikes(likedProducts)
            }
        })
    }, [])

    return (
        <div>
            <h1>Likes</h1>
            {likes.map((product, index) => (
                <div key={index}>
                    <img src={product.images[0].url} alt="" width={100} />
                    <p>{product.id}</p>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    )
}

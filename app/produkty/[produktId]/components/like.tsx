'use client'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

interface Props {
    productId: string
}

export default function Like(p: Props) {
    const [liked, setLiked] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fb.getUser(user.uid)
                if (!userData) return

                setUser(userData)
                if (userData.liked.includes(p.productId)) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            }
        })
    }, [])

    const handleLikeSubmit = async () => {
        if (user === null) return
        if (liked === null) return

        if (liked) {
            const newLiked = user.liked.filter((id) => id !== p.productId)
            await fb.setUserLikes(user.id, newLiked)
            setLiked(false)
        } else {
            const newLiked = [...user.liked, p.productId]
            await fb.setUserLikes(user.id, newLiked)
            setLiked(true)
        }
    }

    return (
        <div>
            <button onClick={handleLikeSubmit}>{liked ? 'Dislike' : 'Like'}</button>
        </div>
    )
}

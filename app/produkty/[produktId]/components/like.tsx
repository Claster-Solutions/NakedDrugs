'use client'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

interface Props {
    productId: string
    user: User | null
}

export default function Like(p: Props) {
    const [liked, setLiked] = useState<boolean | null>(null)

    useEffect(() => {
        if (p.user === null) return
        if (p.user.liked.includes(p.productId)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [p.user])

    const handleLikeClick = async () => {
        if (p.user === null) return
        if (liked === null) return
        setLiked(!liked)

        await fb.toggleUserLike(p.user.id, p.productId)
    }

    return (
        <div>
            <button onClick={handleLikeClick}>{liked ? 'Dislike' : 'Like'}</button>
        </div>
    )
}

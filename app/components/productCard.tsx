'use client'
import Link from 'next/link'
import starYellow from '@/public/icons/star_yellow.svg'
import starGray from '@/public/icons/star_gray.svg'
import grayHeart from '@/public/icons/rating_heart_gray.svg'
import redHeart from '@/public/icons/rating_heart_red.svg'
import { useState } from 'react'

interface Props {
    product: Product
}

export default function ProductCard(p: Props) {
    const averageRate = p.product.reviews.reduce((acc, review) => acc + review.rate, 0) / p.product.reviews.length
    const [isLiked, setIsLiked] = useState(false)

    const starArr = []

    const handleLikeButton = () => {
        setIsLiked(!isLiked)
    }

    for (let i = 1; i <= averageRate; i++) {
        starArr.push(1)
    }
    if (averageRate < 5) {
        const emptyStars = 5 - starArr.length
        for (let i = 1; i <= emptyStars; i++) {
            starArr.push(0)
        }
    }

    return (
        <Link href={`/products/${p.product.id}`}>
            <img src={p.product.images[0].url} alt="" className="aspect-square" />
            <p className="f2 font-medium">{p.product.name}</p>
            <button onClick={handleLikeButton}>
                {isLiked ? <img src={redHeart.src} alt="red heart" /> : <img src={grayHeart.src} alt="gray heart" />}
            </button>
            {/* <p>{averageRate ? averageRate : ''}</p> */}
            <div className="flex flex-row gap-1">
                {starArr.map((val, i) => {
                    return (
                        <div
                            key={i}
                            className="aspect-square max-w-3"
                            // style={{
                            //     background: `linear-gradient(90deg, #ff643d ${val * 100}%, #bbbac0 ${val * 100}%)`,
                            // }}
                        >
                            {val == 1 ? (
                                <img src={starYellow.src} alt="yellow star" />
                            ) : (
                                <img src={starGray.src} alt="gray star" />
                            )}
                        </div>
                    )
                })}
            </div>
        </Link>
    )
}

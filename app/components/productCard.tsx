'use client'
import Link from 'next/link'
import starYellow from '@/public/icons/star_yellow.svg'
import starGray from '@/public/icons/star_gray.svg'
import greyHeart from '@/public/icons/rating_heart_gray.svg'
import redHeart from '@/public/icons/rating_heart_red.svg'
import { use, useEffect, useState } from 'react'
import fb from '@/app/tools/firebase/queries'
import { auth } from '../tools/firebase/main'
interface Props {
    product: Product
}

export default function ProductCard(p: Props) {
    const averageRate = p.product.reviews.reduce((acc, review) => acc + review.rate, 0) / p.product.reviews.length
    const [isLiked, setIsLiked] = useState(false)

    const starArr = []

    const handleLikeButton = async (p: Props) => {
        const user = await auth.currentUser

        console.log(p.product.id, user?.uid)
        if (!isLiked) {
            fb.toggleUserLike(user?.uid || '', p.product.id)
        }
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
        <div>
            <Link href={`/products/${p.product.id}`}>
                <img src={p.product.images[0].url} alt="" className=" aspect-square rounded-md" />
            </Link>
            <div className="flex flex-row">
                <Link className="flex w-full flex-col justify-between  pr-0" href={`/products/${p.product.id}`}>
                    <p className="f4 font-medium">{p.product.name}</p>
                    <p>{p.product.prices[0].price}</p>
                </Link>
                <div className="flex flex-col items-center gap-0 pr-0">
                    <button onClick={() => handleLikeButton(p)} className="w-10 p-2">
                        {isLiked ? (
                            <img src={redHeart.src} alt="red heart" />
                        ) : (
                            <img src={greyHeart.src} alt="grey heart" />
                        )}
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
                </div>
            </div>
        </div>
    )
}

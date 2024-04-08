'use client'
import React, { useEffect, useState } from 'react'
import Amount from './amount'
import Like from './like'
import Dropdown from './dropdownn'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import Cart from './cart'
import Reviews from './reviews'
import WriteReview from './writeReview'

interface Props {
    product: Product
}

export default function Product(p: Props) {
    const product = p.product
    const [amount, setAmount] = useState(1)
    const [price, setPrice] = useState<ProductPrice>(product.prices[0])
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

    return (
        <div className="flex flex-col  pt-20">
            <div className="flex flex-row">
                <div className=" flex w-52 flex-col items-end justify-end gap-1">
                    <img src={product.images[0].url} alt={product.images[0].alt} className="w-full" />
                    <img src={product.images[0].url} alt={product.images[0].alt} className="w-full" />
                    <img src={product.images[0].url} alt={product.images[0].alt} className="w-full" />
                    {/* on button click make the image bmain image and ... */}
                </div>
                <img src={product.images[0].url} alt={product.images[0].alt} className="w-1/2" />
            </div>
            <div className="absolute right-40 flex flex-col justify-center gap-4">
                <h1 className=" text-5xl font-semibold ">{product.name}</h1>
                <p className=" text-sm font-light">{product.description} </p>

                {/* <Like productId={product.id} user={user} />  im not sure this should be there*/}
                <div className="my-4 flex flex-row">
                    <Dropdown prices={product.prices} price={price} setPrice={setPrice} />

                    <Amount amount={amount} setAmount={setAmount} />
                </div>

                <Cart product={product} user={user} price={price} amount={amount} />
            </div>
            <Reviews product={product} />
            <WriteReview product={product} user={user} />
        </div>
    )
}

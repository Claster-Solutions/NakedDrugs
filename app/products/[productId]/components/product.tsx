'use client'
import React, { useEffect, useState } from 'react'
import Amount from './amount'
import Like from './like'
import Cart from './cart'
import Dropdown from './dropdownn'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'

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
        <div className="flex flex-row">
            <div className="">
                {' '}
                <img
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="w-1/2"
                />
            </div>
            <div className="absolute right-40 flex flex-col justify-center gap-5">
                <h1 className=" text-5xl font-semibold ">{product.name}</h1>
                <Like productId={product.id} user={user} />
                <Cart product={product} user={user} price={price} amount={amount} />
                <Dropdown prices={product.prices} price={price} setPrice={setPrice} />
                <p className=" text-sm font-light">{product.description} </p>

                <div className="flex flex-row">
                    <Amount amount={amount} setAmount={setAmount} />
                </div>
            </div>
        </div>
    )
}

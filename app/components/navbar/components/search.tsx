'use client'
import Product from '@/app/products/[productId]/components/product'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Props {
    products: Product[]
}

export default function Search(p: Props) {
    const [query, setQuery] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value
        setQuery(searchQuery)
        if (searchQuery === '') {
            setProducts([])
            return
        }
        const products = p.products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        setProducts(products.slice(0, 5))
    }

    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, ev: KeyboardEvent) => {
        if (e.key === 'Enter') {
            // Perform search or any other action here
        }
    }

    useEffect(() => {
        const inputElement = document.getElementById('search-input')
        if (inputElement) {
            //@ts-ignore
            inputElement.addEventListener('keydown', handleEnterKeyPress)
        }

        return () => {
            if (inputElement) {
                //@ts-ignore
                inputElement.removeEventListener('keydown', handleEnterKeyPress)
            }
        }
    }, [])

    const getAverateRate = (product: Product) => {
        const averageRate = product.reviews.reduce((acc, review) => acc + review.rate, 0) / product.reviews.length
        const star = <img src="/icons/goldStar.svg" className="h-3 w-3" />

        return (
            <div className="flex">
                {Array.from({ length: Math.floor(averageRate) }, (_, i) => (
                    <span key={i}>{star}</span>
                ))}
            </div>
        )
    }

    return (
        <div className="flex h-16 w-full cursor-pointer flex-col items-start">
            <div className="flex h-full w-full items-center">
                <input
                    id="search-input"
                    type="text"
                    className="h-4 w-72"
                    onChange={handleSearch}
                    value={query}
                    placeholder="I want to buy..."
                    autoComplete="off"
                />
            </div>

            <div className={`absolute mt-16 w-72 duration-200`}>
                <div id="search-result" className="flex w-full flex-col rounded bg-white shadow-custom">
                    {products.map((product, index) => (
                        <div key={index}>
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                                className="hover:bg-hades-light flex gap-3 rounded px-5 py-2 duration-0"
                            >
                                <img src={product.images[0].url} className="aspect-square w-12 rounded-sm" />
                                <div>
                                    <p className="f2 font-medium">{product.name}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="f-1">
                                            {product.prices[0].price} - {product.prices[0].volume} |
                                        </p>
                                        {getAverateRate(product)}
                                    </div>
                                </div>
                            </Link>
                            <div className="bg-hades-light h-[1px] w-full" />
                        </div>
                    ))}
                    {products.length !== 0 && (
                        <div>
                            <p className="px-5 py-2 font-light">Press enter to see all results...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

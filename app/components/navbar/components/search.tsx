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
        const stars = '*'.repeat(Math.round(averageRate))
        return stars
    }

    return (
        <div className="flex h-16 w-full cursor-pointer flex-col items-start">
            <div className="flex h-full w-full items-center">
                <input
                    id="search-input"
                    type="text"
                    className="h-4 w-full"
                    onChange={handleSearch}
                    value={query}
                    placeholder="I want to buy..."
                />
            </div>

            <div className={`absolute mt-16 w-64 shadow-custom duration-200`}>
                <div className="flex w-full flex-col rounded bg-white shadow-custom">
                    {products.map((product, index) => (
                        <div key={index}>
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                                className="hover:bg-hades-light flex items-center gap-3 rounded p-1 duration-0"
                            >
                                <img src={product.images[0].url} className="aspect-square w-10 rounded-full" />
                                <div>
                                    <p>
                                        {product.name} - {getAverateRate(product)}
                                    </p>
                                    <p>
                                        {product.prices[0].price} - {product.prices[0].volume}
                                    </p>
                                </div>
                            </Link>
                            <div className="bg-hades-light h-[1px] w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

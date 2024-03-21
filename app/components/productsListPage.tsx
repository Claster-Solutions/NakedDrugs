import React from 'react'
import Filter from './filter'
import Link from 'next/link'
import fb from '../tools/firebase/queries'
import ProductCard from './productCard'

interface Props {
    category: Category
}

export default async function ProductsListPage(p: Props) {
    const products = p.category === 'all' ? await fb.getAllProducts() : await fb.getProductsByCategory(p.category)

    return (
        <div className="flex flex-col py-10">
            <h1 className="f5 font-semibold">Products</h1>
            <div className="flex w-full justify-between">
                <div className="w-2/12">
                    <Filter category={p.category} />
                </div>
                <div className="w-9/12">
                    <div className="grid grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

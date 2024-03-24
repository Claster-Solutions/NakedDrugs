'use client'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ObjectRoot = () => {
    const [products, setProduct] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fb.getAllProducts()
                setProduct(categoriesData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className=" text-primary-blue text-5xl font-semibold uppercase">Products</h1>
            <Link href="/admin/products/control" className="text-3xl uppercase underline">
                Add new
            </Link>
            {products.map((product, index) => (
                <div key={index}>
                    {product.name}{' '}
                    <button className="text-red underline" onClick={() => fb.deleteProduct(product.id)}>
                        Delete
                    </button>
                </div>

                // <DropDownYear category={category} key={index} index={index} />
            ))}
            <div className="sup h-20" />
        </div>
    )
}

export default ObjectRoot

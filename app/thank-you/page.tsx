import Link from 'next/link'
import React from 'react'

export default function Page() {
    return (
        <div>
            <h1>Thank you by Denis Matsenko</h1>
            <Link href="/products">Go to products</Link>
            <Link href="/orders">Go to orders</Link>
        </div>
    )
}

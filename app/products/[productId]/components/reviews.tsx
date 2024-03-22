import React from 'react'

interface Props {
    product: Product
}

export default function Reviews(p: Props) {
    return (
        <div className="mt-10">
            <h1 className="text-3xl">Reviews</h1>
            <div className="mt-10 flex flex-col gap-5 bg-slate-200">
                {p.product.reviews.map((review) => (
                    <div key={review.userId}>
                        <h2>{review.name}</h2>
                        <p>{review.text}</p>
                        <p>{review.rate}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

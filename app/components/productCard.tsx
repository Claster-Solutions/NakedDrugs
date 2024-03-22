import Link from 'next/link'

interface Props {
    product: Product
}

export default function ProductCard(p: Props) {
    const averageRate = p.product.reviews.reduce((acc, review) => acc + review.rate, 0) / p.product.reviews.length

    return (
        <Link href={`/products/${p.product.id}`}>
            <img src={p.product.images[0].url} alt="" className="aspect-square" />
            <p className="f2 font-medium">{p.product.name}</p>
            <p>{averageRate ? averageRate : ''}</p>
        </Link>
    )
}

type AllBlogs = {
    categoryName: string
    blogs: BlogEvent[]
}

type BlogEvent = {
    categoryName: string
    id: string
    title: string
    thrumbnailImageId: string
    description: string
    date: Date
    content: Content[]
}
type AllProducts = {
    products: Product[]
}

type Product = {
    id: string
    name: string
    prices: ProductPrice[]
    description: string
    images: ProductImage[]
    reviews: Review[]
    categories: Category[]
}

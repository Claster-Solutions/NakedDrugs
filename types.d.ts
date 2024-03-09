interface User {
    id: string
    email: string
    name: string
    photoURL: string
    liked: string[]
    referals: string[]
    referal: string
    purchasesCount: number
    cart: CartItem[]
    orders: Order[]
}

interface CartItem {
    id: string
    productId: string
    productName: string
    amount: number
    price: ProductPrice
    productImage: string
}
interface Order {
    items: CartItem[]
    id: string
    state: "pending" | "paid" | "shipped" | "delivered" | "canceled"
    date: Date
    invoice: Invoice
    note: string
}

interface Invoice {
    name: string
    lastName: string
    email: string
    phone: string
    street: string
    city: string
    zip: string
    country: string
}
interface Product {
    id: string
    name: string
    prices: ProductPrice[]
    description: string
    images: ProductImage[]
}
interface ProductImage {
    alt: string
    url: string
}
interface ProductPrice {
    volume: string
    price: string
}

/*content Formater */
type Content =
    | ContentImage
    | ContentImagesSet
    | ContentHeader1
    | ContentHeader2
    | ContentHeader3
    | ContentHeader4
    | ContentParagraph
    | ContentWarningList
    | ContentList

type ContentHeader1 = {
    type: 101
    text: string
}

type ContentHeader2 = {
    type: 102
    text: string
}

type ContentHeader3 = {
    type: 103
    text: string
}

type ContentHeader4 = {
    type: 104
    text: string
}

type ContentParagraph = {
    type: 200
    text: string
}

type ContentImage = {
    type: 300
    id: string
    alt: string
}

type ContentImagesSet = {
    type: 301
    images: string[]
    alt: string
}

type ContentWarningList = {
    type: 400
    items: string[]
}

type ContentList = {
    type: 401
    items: string[]
}

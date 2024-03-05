type User = {
    id: string
    email: string
    name: string
    photoURL: string
    card: Item[]
    liked: string[]
    referals: string[]
    referal: string
    purchasesCount: number
    cart: CartItem[]
}

type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
}

type Item = {
    id: string
    name: string
    description: string
    price: number
    image: string
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

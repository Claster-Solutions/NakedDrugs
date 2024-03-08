import { ref, uploadBytes } from 'firebase/storage'
import { blogCollection, firestorage, usersCollection, productCollection } from './main'
import map from './map'
import {
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    limit,
    deleteDoc,
} from 'firebase/firestore'


// const getUserInfo = async (uid: string): Promise<User> => {
//     const snap = await getDoc(doc(usersCollection, uid))
//     if (!snap.exists()) {
//         throw new Error('User not found')
//     }
//     return map.user(snap)
// }

const getUser = async (uid: string): Promise<User | null> => {
    const snap = await getDoc(doc(usersCollection, uid))
    if (!snap.exists()) {
        return null
    }
    return map.user(snap)
}

const createUser = async (
    uid: string,
    email: string,
    name?: string,
    photoURL?: string,
    referal?: string,
): Promise<void> => {
    const newUser: User = {
        id: uid,
        email,
        name: name || email,
        photoURL: photoURL || '',
        referal: referal || '',
        purchasesCount: 0,
        cart: [],
        liked: [],
        referals: [],
        cart: [],
    }

    await setDoc(doc(usersCollection, newUser.id), newUser)
}
const addToUserCart = async (uid: string, product: Product): Promise<void> => {
    const user = await getUser(uid)
    if (user === null) {
        throw new Error('User not found')
    }
    const newCart = [...user.cart, product]
    await updateDoc(doc(usersCollection, uid), { card: newCart })
}
const getImage = (id: string): string => {
    return 'image avalible after push'
    //return `www.oururl.com/images?id=${id}`
}
const getAllBlogs = async (): Promise<AllBlogs[]> => {
    const snap = await getDocs(blogCollection)

    //* Map docs to ActionEvents
    const blogEvents: BlogEvent[] = snap.docs
        .map((doc) => map.blogEvent(doc))
        .filter((blog) => blog !== undefined) as BlogEvent[]

    //* Group objects by categoryName
    const result: AllBlogs[] = []
    blogEvents.forEach((blog) => {
        const index = result.findIndex(
            (category) => category.categoryName === blog.categoryName,
        )
        if (index === -1) {
            result.push({
                categoryName: blog.categoryName,
                blogs: [blog as BlogEvent],
            })
        } else {
            result[index].blogs.push(blog as BlogEvent)
        }
    })

    //* sort categories by name
    result.sort((a, b) => {
        return b.categoryName.localeCompare(a.categoryName)
    })

    //* Sort events by date
    result.forEach((category) => {
        category.blogs.sort((a, b) => b.date.getTime() - a.date.getTime())
    })

    return result
}

const setImage = async (file: Blob, id: string): Promise<void> => {
    const storageRef = ref(firestorage, `images/${id}`)
    await uploadBytes(storageRef, file)
}
const getBlog = async (id: string): Promise<BlogEvent> => {
    const snap = await getDoc(doc(blogCollection, id))
    const mapped = map.blogEvent(snap)
    if (mapped === undefined) {
        throw new Error('Event not found')
    }
    return mapped
}

const deleteBlog = async (id: string): Promise<void> => {
    await deleteDoc(doc(blogCollection, id))
}

const setBlog = async (event: BlogEvent): Promise<void> => {
    console.log(event)
    await setDoc(doc(blogCollection, event.id), { ...event, updatedAt: new Date() })
    console.log('done')
}

const getLastBlogLimited = async (limitInt: number): Promise<BlogEvent[]> => {
    const snap = await getDocs(
        query(blogCollection, orderBy('date', 'desc'), limit(limitInt)),
    )
    const mapped = snap.docs.map((doc) => map.blogEvent(doc))
    return mapped.filter((event) => event !== undefined) as BlogEvent[]
}

//* Product
const getProduct = async (id: string): Promise<Product> => {
    const snap = await getDoc(doc(productCollection, id))
    const mapped = map.product(snap)
    if (mapped === undefined) {
        throw new Error('Product not found')
    }
    return mapped
}

const getAllProducts = async (): Promise<Product[]> => {
    const snap = await getDocs(productCollection)

    //* Map docs to ActionEvents
    const products: Product[] = snap.docs
        .map((doc) => map.product(doc))
        .filter((product) => product !== undefined) as Product[]
    return products
}

//! TEMP
const addNewProduct = async (): Promise<void> => {
    const newProduct: Product = {
        id: "KratomBlue",
        name: "Kratom Blue",
        prices: [{ volume: "100g", price: "100" }, { volume: "200g", price: "190" }, { volume: "500g", price: "450" }],
        description: "Kratom Blue is the best kratom in the world",
        images: [{ alt: "Kratom Blue", url: "/kratom_placeholder.webp" }],
    }
    await setDoc(doc(productCollection, newProduct.id), newProduct)
}

const toggleUserLike = async (uid: string, productId: string): Promise<void> => {
    const user = await getUser(uid)
    if (user === null) return

    const newLiked = user.liked.includes(productId)
        ? user.liked.filter((id) => id !== productId)
        : [...user.liked, productId]

    await updateDoc(doc(usersCollection, uid), { liked: newLiked })

}

const addCartItem = async (uid: string, cartItem: CartItem): Promise<void> => {
    const user = await getUser(uid)
    if (user === null) return

    console.log(user)

    const newCart = [...user.cart, cartItem]
    await updateDoc(doc(usersCollection, uid), { cart: newCart })
}

const fb = {
    getImage,
    getUser,
    createUser,
    getBlog,
    deleteBlog,
    setBlog,
    getLastBlogLimited,
    getAllBlogs,
    getProduct,
    setImage,
    getAllProducts,
    addNewProduct,
    toggleUserLike,
    addCartItem
}
export default fb

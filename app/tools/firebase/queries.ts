import { blogCollection, usersCollection } from './main'
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

const getUserInfo = async (uid: string): Promise<AppUser> => {
    const snap = await getDoc(doc(usersCollection, uid))
    if (!snap.exists()) {
        throw new Error('User not found')
    }
    return map.user(snap)
}

const createUser = async (user: AppUser): Promise<void> => {
    await setDoc(doc(usersCollection, user.uid), { ...user })
}

const fb = {
    getUserInfo,
    createUser,
    getBlog,
    deleteBlog,
    setBlog,
    getLastBlogLimited,
    getAllBlogs,
}
export default fb

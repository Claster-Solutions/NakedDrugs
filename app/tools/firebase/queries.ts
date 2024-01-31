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

const getUserInfo = async (uid: string): Promise<User> => {
    const snap = await getDoc(doc(usersCollection, uid))
    if (!snap.exists()) {
        throw new Error('User not found')
    }
    return map.user(snap)
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
const fb = {
    getUserInfo,
    getAllBlogs,
}
export default fb

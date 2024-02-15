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
    //  date: Date
    content: Content[]
}

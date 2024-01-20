export const blog: BlogParent[] = [
    {
        title: 'blog title',
        img: '',
        description: 'blog description here ... ',

        inside: [],
    },
]

interface BlogParent {
    title: string
    img: string
    description: string
    inside: Blog[]
}

interface Blog {
    test: string
}

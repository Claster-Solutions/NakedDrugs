import { DocumentData, DocumentSnapshot } from 'firebase/firestore'

// const user = (doc: DocumentData): User => {
//     const data = doc.data()
//     return {
//         id: doc.id,
//         name: data.name,
//         email: data.email,
//     }
// }
const user = (doc: DocumentData): User => {
    const data = doc.data()
    return {
        id: doc.id,
        email: data.email,
        name: data.name,
        photoURL: data.photoURL,
        card: data.card,
        liked: data.liked,
        referals: data.referals,
        referal: data.referal,
        purchasesCount: data.purchasesCount,
    }
}
const blogEvent = (
    doc: DocumentSnapshot<DocumentData, DocumentData>,
): BlogEvent | undefined => {
    if (!doc.exists()) {
        return undefined
    }

    return {
        categoryName: doc.data().categoryName,
        id: doc.id,
        title: doc.data().title,
        date: doc.data().date.toDate(),
        content: doc.data().content,
        description: doc.data().description,
        thrumbnailImageId: doc.data().thrumbnailImageId,
    }
}

const map = {
    user,
    blogEvent,
}
export default map

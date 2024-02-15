import { DocumentData, DocumentSnapshot } from "firebase/firestore"

const user = (doc: DocumentData): User => {
    const data = doc.data();
    return {
        id: doc.id,
        email: data.email,
        name: data.name,
        photoURL: data.photoURL,
        card: data.card,
        liked: data.liked,
        referals: data.referals,
        referal: data.referal,
        purchasesCount: data.purchasesCount
    }
}

const map = {
    user
}
export default map
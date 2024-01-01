import { DocumentData, DocumentSnapshot } from "firebase/firestore"

const user = (doc: DocumentData): User => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        email: data.email
    }
}

const map = {
    user
}
export default map
import { DocumentData, DocumentSnapshot } from "firebase/firestore"

const user = (doc: DocumentData): AppUser => {
    const data = doc.data();
    return {
        uid: doc.id,
        email: data.email,
        sentence: data.sentence
    }
}

const map = {
    user
}
export default map
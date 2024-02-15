import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, usersCollection } from "./main";
import map from "./map";


const getUser = async (uid: string): Promise<User | null> => {
    const snap = await getDoc(doc(usersCollection, uid));
    if (!snap.exists()) {
        return null
    }
    return map.user(snap);
}

const createUser = async (uid: string, email: string, name?: string, photoURL?: string, referal?: string): Promise<void> => {
    const newUser: User = {
        id: uid,
        email,
        name: name || email,
        photoURL: photoURL || "",
        referal: referal || "",
        purchasesCount: 0,

        card: [],
        liked: [],
        referals: [],

    }

    await setDoc(doc(usersCollection, newUser.id), newUser);
}

const be = {
    getUser,
    createUser
}
export default be;
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, usersCollection } from "./main";
import map from "./map";

const getUserInfo = async (uid: string): Promise<AppUser> => {
    const snap = await getDoc(doc(usersCollection, uid));
    if (!snap.exists()) {
        throw new Error("User not found");
    }
    return map.user(snap);
}

const createUser = async (user: AppUser): Promise<void> => {
    await setDoc(doc(usersCollection, user.uid), { ...user });
}

const fb = {
    getUserInfo,
    createUser
}
export default fb;
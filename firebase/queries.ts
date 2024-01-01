import { doc, getDoc, getDocs } from "firebase/firestore";
import { usersCollection } from "./main";
import map from "./map";

const getUserInfo = async (uid: string): Promise<User> => {
    const snap = await getDoc(doc(usersCollection, uid));
    if (!snap.exists()) {
        throw new Error("User not found");
    }
    return map.user(snap);
}

const fb = {
    getUserInfo
}
export default fb;
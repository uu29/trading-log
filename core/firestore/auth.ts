import { firebaseApp } from "firebase.config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const collection_name = "members";

type AsyncBool = Promise<boolean>;
const AsyncBool = Promise;
export const checkIsExist = async (email: string): AsyncBool => {
  const newUserRef = collection(db, collection_name);
  const q = query(newUserRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return Boolean(querySnapshot.size > 0);
};

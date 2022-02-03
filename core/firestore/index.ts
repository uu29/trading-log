import { firebaseApp } from "firebase.config";
import { query, getFirestore, collection, getDocs, QueryConstraint, setDoc, deleteDoc, doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export const fetchData = async <T>(col_name: string) => {
  const col = collection(db, col_name);
  const snapshot = await getDocs(col);
  const list = await snapshot.docs.map((doc) => doc.data());
  return list as T[];
};

export const fetchQueryData = async <T>(col_name: string, wheres: QueryConstraint[]) => {
  const q = query(collection(db, col_name), ...wheres);
  const querySnapshot = await getDocs(q);
  const list = await querySnapshot.docs.map((doc) => doc.data());
  return list as T[];
};

export const setDocData = async <T>(col_name: string, unique_key: string, form: T) => {
  const newDocRef = await setDoc(doc(db, col_name, unique_key), form);
  return newDocRef;
};

export const deleteDocData = async <T>(col_name: string, unique_key: string) => {
  const delDocRef = await deleteDoc(doc(db, col_name, unique_key));
  return delDocRef;
};

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

export const setDocData = <T>(col_name: string, unique_key: string, form: T) => setDoc(doc(db, col_name, unique_key), form);
export const deleteDocData = (col_name: string, unique_key: string) => deleteDoc(doc(db, col_name, unique_key));

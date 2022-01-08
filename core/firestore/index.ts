import { firebaseApp } from "firebase.config";
import { query, getFirestore, collection, getDocs, QueryConstraint } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export const fetchData = async <T>(colName: string) => {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = await snapshot.docs.map((doc) => doc.data());
  return list as T[];
};

export const fetchQueryData = async <T>(colName: string, wheres: QueryConstraint[]) => {
  const q = query(collection(db, colName), ...wheres);
  const querySnapshot = await getDocs(q);
  const list = await querySnapshot.docs.map((doc) => doc.data());
  return list as T[];
};

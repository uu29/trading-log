import { firebaseApp } from "firebase.config";
import { query, where, getFirestore, collection, getDocs, Timestamp, QueryConstraint, Query, DocumentData } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export const fetchData = async <T>(colName: string) => {
  const col = collection(db, colName);
  const snapshot = await getDocs(col);
  const list = await snapshot.docs.map((doc) => doc.data());
  return list as T[];
};

export const fetchQueryData = async <T>(colName: string, where: QueryConstraint) => {
  const q = query(collection(db, colName), where);
  const querySnapshot = await getDocs(q);
  const list = await querySnapshot.docs.map((doc) => doc.data());
  return list as T[];
};

export const getDate = (date: Timestamp): string => {
  const t = date.toDate();
  const y = t.getFullYear();
  const m = t.getMonth() + 1;
  const dd = t.getDate();
  return `${y}/${m}/${dd}`;
};

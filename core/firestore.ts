import { firebaseApp } from "firebase.config";
import { query, getFirestore, collection, getDocs, Timestamp, QueryConstraint } from "firebase/firestore";
import { IDateObj } from "interface";
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

export const getDateObjFromTimestamp = (date: Timestamp): IDateObj => {
  const t = date.toDate();
  const _y = t.getFullYear();
  const _m = t.getMonth() + 1;
  const _d = t.getDate();
  return { _y, _m, _d };
};

export const getDateStrFromTimestamp = (date: Timestamp): string => {
  const { _y, _m, _d } = getDateObjFromTimestamp(date);
  return `${_y}/${_m}/${_d}`;
};

export const getTimestampSecFromDate = (date: Timestamp) => {
  const { _y, _m, _d } = getDateObjFromTimestamp(date);
  return Timestamp.fromDate(new Date(_y, _m, _d)).seconds;
};

export const getTimestampSecFromNumber = (_y: number, _m: number, _d: number) => {
  return Timestamp.fromDate(new Date(_y, _m, _d)).seconds;
};

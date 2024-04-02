import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "./Firebase";

const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  // const unsubscribe = fireabaseDB.collection(collectionName).onSnapshot((snapshot) => {
  //     setData(snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //        ...doc.data(),
  //     })));
  // });
  // return () => unsubscribe();
  // fetchData();
  // }, [collectionName]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapShot = await getDocs(
        collection(firestore, collectionName)
      );
      const fetchData = [];
      querySnapShot.forEach((doc) => {
        fetchData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(fetchData);
    } catch (e) {
      // console.log(e);
      setError(error);
    } finally {
      setLoading(false);
      console.log("finally");
    }
  };
  const addData = async (newData) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        ...newData,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const updateData = async (id, newData) => {
    setLoading(true);
    try {
      await updateDoc(doc(firestore, collectionName, id), newData);
      // fetchData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(firestore, collectionName, id));
      fetchData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    addData,
    updateData,
    deleteData,
    fetchData,
    setData,
  };
};
export default useFirestore;

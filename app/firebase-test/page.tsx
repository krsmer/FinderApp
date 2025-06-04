"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FirebaseTest() {
  const [docs, setDocs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const snapshot = await getDocs(collection(db, "LostItems"));
        setDocs(snapshot.docs.map(doc => doc.data()));
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchTest();
  }, []);

  if (error) 
    return 
    <div className="text-black mt-[70px]">Firebase Hatası: {error}</div>;
  if(!docs.length) return <div>Veri Yok</div>;
  return (
    <div>
      <h2>Firebase Test</h2>
      <pre>{JSON.stringify(docs, null, 2)}</pre>
    </div>
  );
}
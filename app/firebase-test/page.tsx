"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type LostItem = {
  [key: string]: unknown;
};

export default function FirebaseTest() {
  const [docs, setDocs] = useState<LostItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const snapshot = await getDocs(collection(db, "LostItems"));
        setDocs(snapshot.docs.map(doc => doc.data() as LostItem));
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Bilinmeyen bir hata oluştu.");
      }
    };
    fetchTest();
  }, []);

  if (error)
    return <div className="text-black mt-[70px]">Firebase Hatası: {error}</div>;
  if (!docs.length) return <div>Veri Yok</div>;
  return (
    <div>
      <h2>Firebase Test</h2>
      <pre>{JSON.stringify(docs, null, 2)}</pre>
    </div>
  );
}
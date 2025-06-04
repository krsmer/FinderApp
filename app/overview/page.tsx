"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Image from "next/image";
interface LostItem {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  imageUrl?: string;
  createdAt?: "";
}

const OverviewPage = () => {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(collection(db, "LostItems"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as LostItem[];
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  return (
    <div className="pt-20 flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Kayıp Eşyalar</h1>
      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500">Henüz kayıp eşya başvurusu yok.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded shadow p-6 flex flex-col items-center">
              <div className="text-gray-600 mb-1">
                <span className="text-sm text-gray-500">Başvuru Tarihi: </span>{""}
                {item.createdAt && item.createdAt.toDate ? item.createdAt.toDate().toLocaleDateString("tr-TR"):""}
              </div>
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <div className="w-full">
                <h2 className="text-xl font-bold text-blue-700 mb-2">{item.name}</h2>
                <div className="text-gray-600 mb-1">
                  <span className="font-semibold">Konum:</span> {item.location}
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-semibold">Tarih:</span> {item.date}
                </div>
                <div className="text-gray-700 mt-2">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import Image from "next/image";

interface LostItem {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  imageUrl?: string;
  createdAt?: Timestamp;
}

const OverviewPage = () => {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, "LostItems"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as LostItem[];
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageLoad = (itemId: string) => {
    console.log(`Image loaded successfully for item: ${itemId}`);
  };

  return (
    <div className="pt-20 flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl dark:text-white font-bold text-gray-800 mb-8">Kayıp Eşyalar</h1>
      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500">Henüz kayıp eşya başvurusu yok.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Başvuru Tarihi: </span>
                {item.createdAt && item.createdAt.toDate ? 
                  item.createdAt.toDate().toLocaleDateString("tr-TR") : 
                  "Tarih belirtilmemiş"
                }
              </div>
              
              {item.imageUrl && !imageErrors[item.id] ? (
                <div className="w-full mb-4">
                  <div 
                    className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden cursor-pointer"
                    onClick={() => { if (item.imageUrl) setSelectedImage(item.imageUrl); }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name || "Kayıp eşya"}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48 hover:opacity-90 transition-opacity"
                      onError={() => handleImageError(item.id)}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </div>
                </div>
              ) : item.imageUrl && imageErrors[item.id] ? (
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded mb-4 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Fotoğraf yüklenemedi</p>
                  </div>
                </div>
              ) : null}

              <div className="w-full">
                <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">{item.name}</h2>
                <div className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Konum:</span> {item.location}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Tarih:</span> {item.date}
                </div>
                <div className="text-gray-700 dark:text-gray-200 mt-2">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal - Büyük Fotoğraf Gösterimi */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image
              src={selectedImage}
              alt="Büyütülmüş fotoğraf"
              width={1200}
              height={900}
              className="object-contain w-full h-full"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              onClick={() => setSelectedImage(null)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
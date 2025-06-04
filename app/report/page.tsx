"use client";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import Image from "next/image";
const ReportPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setPreview(URL.createObjectURL(selected));
      setFile(selected);
    } else {
      setPreview(null);
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form verilerini al
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;

    let imageUrl = "";
    if (file) {
      // Storage'a yükle
      const storageRef = ref(storage, `LostItems/${file.name}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Firestore'a kaydet
    await addDoc(collection(db, "LostItems"), {
      name,
      location,
      date,
      description,
      imageUrl,
      createdAt: Timestamp.now(),
    });

    setLoading(false);
    // İstersen formu sıfırla veya yönlendir
    form.reset();
    setPreview(null);
    setFile(null);
    alert("Başvurunuz kaydedildi!");
  };

  return (
    <div className="pt-20 flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-9">Kayıp Eşya Başvurusu</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md flex flex-col gap-4">
        {/* ...Dosya seçme alanı aynı kalabilir... */}
        <label className="block text-gray-700 font-bold mb-2">
          Kayıp Eşyanın Fotoğrafı
          <div className="mt-2 flex items-center gap-2">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Dosya Seç
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-gray-500 text-sm">
              {preview ? "Dosya seçildi" : "Dosya seçilmedi"}
            </span>
          </div>
        </label>
        {preview && (
          <Image src={preview} alt="Önizleme" className="w-full h-48 object-cover rounded mb-2" />
        )}
        <label className="block text-gray-700 font-bold mb-2">
          Eşya Adı
          <input
            name="name"
            type="text"
            placeholder="Örn: Cüzdan"
            className="mt-2 border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Kaybolduğu Yer
          <input
            name="location"
            type="text"
            placeholder="Örn: İstanbul, Kadıköy"
            className="mt-2 border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Kaybolma Tarihi
          <input
            name="date"
            type="date"
            className="mt-2 border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Açıklama
          <textarea
            name="description"
            placeholder="Eşya hakkında detaylı bilgi ve iletişim bilgisi..."
            className="mt-2 border rounded w-full py-2 px-3 text-gray-700"
            rows={3}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Başvur"}
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
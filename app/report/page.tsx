"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";

const ReportPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form verilerini al
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;

    if (!name || !location || !date || !description) {
    setLoading(false);
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

    await addDoc(collection(db, "LostItems"), {
      name,
      location,
      date,
      description,
      createdAt: Timestamp.now(),
    });

    setLoading(false);
    form.reset();
    alert("Başvurunuz kaydedildi!");
  };

  // Fotoğraf yükleme alanı devre dışı ve uyarılı
  const handlePhotoClick = () => {
    alert("Fotoğraf ekleme özelliği yakında eklenecek!");
  };

  return (
    <div className="pt-20 flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-9">Kayıp Eşya Başvurusu</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md flex flex-col gap-4"
      >
        <label className="block text-gray-700 font-bold mb-2">
          Kayıp Eşyanın Fotoğrafı
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              className="cursor-not-allowed bg-gray-400 text-white py-2 px-4 rounded"
              disabled
              onClick={handlePhotoClick}
              tabIndex={0}
            >
              Dosya Seç
            </button>
            <span className="text-gray-500 text-sm">
              Fotoğraf ekleme özelliği yakında aktif olacak.
            </span>
          </div>
        </label>
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
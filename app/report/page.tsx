"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";

const ReportPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
    const photoInput = form.elements.namedItem("photo") as HTMLInputElement;

    if (!name || !location || !date || !description) {
      setLoading(false);
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    let imageUrl = "";
    if (photoInput && photoInput.files && photoInput.files[0]) {
      const file = photoInput.files[0];
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });
      const data = await res.json();
      imageUrl = data.url;
    }

    await addDoc(collection(db, "LostItems"), {
      name,
      location,
      date,
      description,
      imageUrl: imageUrl || "",
      createdAt: Timestamp.now(),
    });

    

    setLoading(false);
    form.reset();
    alert("Başvurunuz kaydedildi!");
  };

  return (
    <div className="pt-20 flex flex-col dark:bg-gray-900 items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-9">Kayıp Eşya Başvurusu</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-700  shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md flex flex-col gap-4"
      >
        <label className="block text-gray-700 dark:text-white font-bold mb-2">
          Kayıp Eşyanın Fotoğrafı
          <input
            name="photo"
            type="file"
            accept="image/*"
            className="mt-2"
          />
        </label>
        <label className="block text-gray-700 dark:text-white font-bold mb-2">
          Eşya Adı
          <input
            name="name"
            type="text"
            placeholder="Örn: Cüzdan"
            className="mt-2 border rounded w-full py-2 dark:text-white px-3 text-gray-700"
            required
          />
        </label>
        <label className="block text-gray-700 dark:text-white font-bold mb-2">
          Kaybolduğu Yer
          <input
            name="location"
            type="text"
            placeholder="Örn: İstanbul, Kadıköy"
            className="mt-2 border rounded w-full py-2 px-3 dark:text-white text-gray-700"
            required
          />
        </label>
        <label className="block dark:text-white text-gray-700 font-bold mb-2">
          Kaybolma Tarihi
          <input
            name="date"
            type="date"
            className="mt-2 border rounded w-full dark:text-white py-2 px-3 text-gray-700"
            required
          />
        </label>
        <label className="block text-gray-700 dark:text-white font-bold mb-2">
          Açıklama
          <textarea
            name="description"
            placeholder="Eşya hakkında detaylı bilgi ve iletişim bilgisi..."
            className="mt-2 border rounded w-full py-2 px-3 dark:text-white text-gray-700"
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
"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import React, { useState, useRef } from "react";

const ReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

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
    setSelectedFile(null);
    form.reset();
    alert("Başvurunuz kaydedildi!");
  };

  return (
    <div className="pt-20 flex flex-col dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-9">
        Kayıp Eşya Başvurusu
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md flex flex-col gap-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
            Kayıp Eşyanın Fotoğrafı
          </label>
          <input
            ref={fileInputRef}
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded 
                border border-gray-300 dark:border-gray-600 transition-colors duration-200"
            >
              Fotoğraf Seç
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {selectedFile ? selectedFile.name : 'Dosya seçilmedi'}
            </span>
          </div>
        </div>

        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
          Eşya Adı
          <input
            name="name"
            type="text"
            placeholder="Örn: Cüzdan"
            className="mt-2 border dark:border-gray-600 rounded w-full py-2 px-3 
              text-gray-700 dark:text-gray-200 dark:bg-gray-700 
              focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </label>

        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
          Kaybolduğu Yer
          <input
            name="location"
            type="text"
            placeholder="Örn: İstanbul, Kadıköy"
            className="mt-2 border dark:border-gray-600 rounded w-full py-2 px-3 
              text-gray-700 dark:text-gray-200 dark:bg-gray-700 
              focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </label>

        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
          Kaybolma Tarihi
          <input
            name="date"
            type="date"
            className="mt-2 border dark:border-gray-600 rounded w-full py-2 px-3 
              text-gray-700 dark:text-gray-200 dark:bg-gray-700 
              focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            required
          />
        </label>

        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
          Açıklama
          <textarea
            name="description"
            placeholder="Eşya hakkında detaylı bilgi ve iletişim bilgisi..."
            className="mt-2 border dark:border-gray-600 rounded w-full py-2 px-3 
              text-gray-700 dark:text-gray-200 dark:bg-gray-700 
              focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            rows={3}
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold 
            py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 
            disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Başvur"}
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "FinderApp nedir?",
    answer: "FinderApp, kayıp eşya bulma ve kayıp eşya ilanı verme platformudur.",
  },
  {
    question: "Kayıp eşya nasıl eklenir?",
    answer: "Ana sayfadaki 'Kayıp Eşyalar' bölümünden bulduğunuz eşyayı fotoğraf ve açıklama ile ekleyebilirsiniz.",
  },
  {
    question: "Kayıp başvurusu nasıl yapılır?",
    answer: "Yardım başvurusu sayfasından kaybettiğiniz eşya için ilan oluşturabilirsiniz.",
  },
  {
    question: "İletişim bilgileri nasıl paylaşılır?",
    answer: "İlan oluştururken açıklama kısmına iletişim bilgilerinizi ekleyebilirsiniz.",
  },
];

const QuestionPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pt-20 flex flex-col dark:bg-gray-900 items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold dark-gray-500 mb-8">Sıkça Sorulan Sorular</h1>
      <div className="w-full max-w-2xl space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded shadow">
            <button
              className="w-full text-left px-6 py-4 font-semibold text-gray-700 focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(idx)}
            >
              {faq.question}
              <span className="cursor-pointer">{openIndex === idx ? "-" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
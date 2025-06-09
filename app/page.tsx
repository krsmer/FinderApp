import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <main className="flex-grow flex items-center justify-center pt-16 pb-20 md:pb-4 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative">
      <div className="text-3xl md:text-5xl dark:text-gray-400 text-gray-800 font-semibold text-center max-w-4xl w-full px-4">
        Finder Uygulamasına Hoş Geldin
        <p className="text-base md:text-xl pt-8 md:pt-10 dark:text-gray-400">
          FinderApp, kayıp eşyalarınızı kolayca ilan verebileceğiniz ve topluluğun desteğiyle kısa sürede bulabileceğiniz bir platformdur.
          İster kayıp bir eşya bulmuş olun, ister kendi eşyanızı arıyor olun; ilan oluşturabilir, detaylı açıklama ve fotoğraf ekleyerek daha fazla kişiye ulaşabilirsiniz.
          Topluluğumuzun yardımıyla kaybolan eşyalarınıza kavuşmak artık çok daha kolay!
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-12">
          <Image
            src="/lost-items.png"
            alt="Lost Item"
            width={80}
            height={80}
            className="hover:scale-110 transition-transform duration-300"
          />
          <Image
            src="/search.png"
            alt="Search Item"
            width={80}
            height={80}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Signature */}
      <div className="absolute bottom-6 md:bottom-4 right-4 text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-light italic">
          Developed by{" "}
          <a 
            href="https://github.com/krsmer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Ahmet Arif Özer
          </a>
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          © {new Date().getFullYear()} FinderApp
        </p>
      </div>
    </main>
  );
};

export default HomePage;
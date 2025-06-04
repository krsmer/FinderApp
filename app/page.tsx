import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <main className="flex-grow flex items-center justify-center pt-16">
      <div className="text-3xl md:text-5xl text-gray-800 font-semibold text-center mt-25 max-w-4xl w-full px-4">
        Finder Uygulamasına Hoş Geldin
        <p className="text-base md:text-xl pt-8 md:pt-10">
          FinderApp, kayıp eşyalarınızı kolayca ilan verebileceğiniz ve topluluğun desteğiyle kısa sürede bulabileceğiniz bir platformdur.
          İster kayıp bir eşya bulmuş olun, ister kendi eşyanızı arıyor olun; ilan oluşturabilir, detaylı açıklama ve fotoğraf ekleyerek daha fazla kişiye ulaşabilirsiniz.
          Topluluğumuzun yardımıyla kaybolan eşyalarınıza kavuşmak artık çok daha kolay!
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-16 mt-18">
          <Image
            src="/lost-items.png"
            alt="Lost Item"
            width={120}
            height={120}
            
          />
          <Image
            src="/search.png"
            alt="Search Item"
            width={120}
            height={120}
            
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
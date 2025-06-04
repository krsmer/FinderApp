import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileNav from "@/components/MobileNav";
import { User } from "lucide-react";

export const metadata = {
  title: "Finder Application",
  description: "Finder Appplication helps you report items",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <Navbar />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
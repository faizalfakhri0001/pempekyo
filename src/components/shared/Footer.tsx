/** @format */

import React from "react";
import Link from "next/link";
import { APP_NAME } from "../../constants/components";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Assuming you have these icons or similar
const InstagramIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
  </svg>
);
const FacebookIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.04C6.48 2.04 2 6.52 2 12s4.48 9.96 10 9.96c5.52 0 10-4.48 10-9.96S17.52 2.04 12 2.04zm3.03 7.02h-1.6V18h-2.8V9.06H9v-2.1h1.63V5.57c0-1.28.65-2.43 2.43-2.43h1.83v2.1h-1.1c-.53 0-.8.24-.8.77v1.48h1.9l-.3 2.1z" />
  </svg>
);
const TwitterIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.48 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.45,16 6.13,17.26 8.13,17.29C6.67,18.45 4.81,19.12 2.79,19.12C2.42,19.12 2.04,19.1 1.67,19.04C3.67,20.38 6.04,21.18 8.6,21.18C16,21.18 20.24,15.22 20.24,10.03C20.24,9.81 20.24,9.59 20.23,9.37C20.94,8.85 21.62,8.19 22.22,7.42C21.51,7.74 20.75,7.95 19.95,8.03C20.75,7.55 21.36,6.79 21.67,5.9Z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* PempekYo Info */}
          <div>
            <h5 className="text-xl font-bold text-gray-900 mb-4">{APP_NAME}</h5>
            <p className="text-sm leading-relaxed">
              Menyajikan pempek asli Palembang dengan kualitas terbaik. Kami
              berkomitmen untuk memberikan pengalaman kuliner yang tak
              terlupakan.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <InstagramIcon />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <FacebookIcon />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <TwitterIcon />
              </Link>
            </div>
          </div>

          {/* Informasi Links */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-gray-900">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-900">
                  Cara Pemesanan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-900">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">Kontak</h5>
            <ul className="space-y-2 text-sm">
              <li>Jl. Merdeka No. 123, Palembang, Sumatera Selatan</li>
              <li>+62 812 3456 7890</li>
              <li>info@Pempekyo.com</li>
            </ul>
          </div>

          {/* Berlangganan */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-4">
              Berlangganan
            </h5>
            <p className="text-sm mb-3">
              Dapatkan informasi terbaru dan promo menarik dari kami.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Email Anda"
                className="rounded-r-none"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-gray-800 hover:bg-gray-900 text-white"
              >
                Langganan
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

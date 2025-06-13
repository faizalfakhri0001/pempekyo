/** @format */

"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import ProductCard from "../components/shared/ProductCard";
import TestimonialCard from "../components/shared/TestimonialCard";
import OrderStep from "../components/shared/OrderStep";
import { MOCK_PRODUCTS, MOCK_TESTIMONIALS } from "@/constants/components";
import { ChevronRightIcon } from "lucide-react";

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/pempekhero/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Nikmati Kelezatan Pempek <br className="hidden sm:inline" />
            Asli Palembang
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Pesan sekarang, diantar langsung ke rumahmu. Nikmati berbagai
            pilihan pempek lezat yang dibuat dengan resep tradisional Palembang
            dan bahan-bahan berkualitas tinggi.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
              asChild
            >
              <Link href="#menu">Pesan Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Produk Unggulan Section */}
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Produk Unggulan Kami
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Nikmati berbagai pilihan pempek lezat yang dibuat dengan resep
            tradisional Palembang dan bahan-bahan berkualitas tinggi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
              asChild
            >
              <Link href="/checkout/cart">
                {" "}
                {/* Or a dedicated menu page */}
                Lihat Semua Menu <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cara Pemesanan Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Cara Pemesanan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <OrderStep
              stepNumber="1"
              title="Pilih Menu Favorit"
              description="Pilih menu pempek yang Anda sukai dari katalog kami yang lengkap."
            />
            <OrderStep
              stepNumber="2"
              title="Lakukan Pembayaran"
              description="Selesaikan pesanan dengan metode pembayaran yang aman dan nyaman."
            />
            <OrderStep
              stepNumber="3"
              title="Terima Pesanan"
              description="Pesanan akan segera kami antar langsung ke alamat yang ditentukan."
            />
          </div>
        </div>
      </section>

      {/* Pesan Tanpa Login Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Pesan Tanpa Login</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Tidak ingin membuat akun? Tidak masalah! Anda tetap bisa memesan
            pempek favorit tanpa perlu login. Cukup masukkan informasi
            pengiriman saat checkout.
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
            asChild
          >
            <Link href="/checkout/cart">
              {" "}
              {/* Or directly to shipping if cart is empty */}
              Pesan Sekarang Tanpa Login{" "}
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Apa Kata Pelanggan Section */}
      <section id="tentang-kami" className="py-16 bg-white">
        {" "}
        {/* Combined with 'Tentang Kami' for now */}
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Lihat pengalaman pelanggan yang telah mencoba pempek lezat dari kami
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder (as per nav link) */}
      <section id="kontak" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami
            melalui informasi kontak di bawah ini atau kunjungi footer.
          </p>
          <div className="text-lg text-gray-700">
            <p>Email: info@Pempekyo.com</p>
            <p>Telepon: +62 812 3456 7890</p>
          </div>
        </div>
      </section>
    </div>
  );
}

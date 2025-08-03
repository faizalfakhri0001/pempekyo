/** @format */

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

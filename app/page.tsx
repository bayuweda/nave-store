import Navbar from "@/components/layout/Navbar";
import Featured from "@/components/section/Featured";
import Hero from "@/components/section/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
    </>
  );
}

import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { navItems, navTitles } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden">
      <div className="max-w-7xl w-full">
        <Navbar navItems={navItems} current={navTitles.Home} />
        <Hero />
        <Grid />
        <Footer />
      </div>
    </main>
  );
}

import { navItems, navTitles } from "../routes";
import { Navbar } from "@/components/Navbar";
import Hero from "./Hero";
import Grid from "./Grid";
import Footer from "./Footer";

export default async function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden pb-8">
      <div className="max-w-7xl w-full">
        <Navbar navItems={navItems} current={navTitles.Home} />
        <Hero />
        <Grid />
        <Footer />
      </div>
    </main>
  );
}
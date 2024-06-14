import { navTitles } from "@/app/routes";
import MainPage from "@/components/MainPageHOC";

import FooterCTA from "./FooterCTA";
import Grid from "./Grid";
import Hero from "./Hero";
import Jobs from "./Jobs";
import Steps from "./Steps";

export default async function Home() {
  return (
    <MainPage activeNav={navTitles.Home}>
      <Hero />
      <Grid />
      <Steps />
      <Jobs />
      <FooterCTA />
    </MainPage>
  );
}

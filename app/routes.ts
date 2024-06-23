export enum Routes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  CONTESTS = "/contests",
  PROBLEMS = "/problems",
  ABOUT = "/about",
  PROFILE = "/profile",
  REGISTER = "/register",
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgot-password",

  MANAGE_CONTESTS = CONTESTS + "/manage",
  NEW_CONTEST = MANAGE_CONTESTS + "/new",
}

export enum navTitles {
  Home = "Home",
  Contests = "Contests",
  Problems = "Problems",
  About = "About",
}

export const navItems = [
  { name: navTitles.Home, link: Routes.HOME },
  { name: navTitles.Contests, link: Routes.CONTESTS },
  { name: navTitles.Problems, link: Routes.PROBLEMS },
  { name: navTitles.About, link: Routes.ABOUT },
];

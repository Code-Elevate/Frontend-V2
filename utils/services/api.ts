enum ApiRoutes {
  // Base URL
  _BASE = "https://code-elevate.gopalsaraf.com/api",
  // _BASE = "http://localhost:8080",

  // Auth Routes
  REGISTER = _BASE + "/users/register",
  LOGIN = _BASE + "/users/login",

  // Contest Routes
  CONTESTS = _BASE + "/contests",
  CONTEST = _BASE + "/contests/:id",
  MANAGE_CONTEST = _BASE + "/manage/contests",
  NEW_CONTEST = _BASE + "/manage/contests/add",

  // User Routes
  DETAILS = _BASE + "/users/details",
  HISTORY = _BASE + "/users/history",
  SEARCH = _BASE + "/users/search",
}

export default ApiRoutes;

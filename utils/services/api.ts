class ApiRoutes {
  // Base URL
  static _BASE = "https://code-elevate-api.onrender.com";
  // static _BASE = "http://localhost:8080";

  // Auth Routes
  static REGISTER = this._BASE + "/users/register";
  static LOGIN = this._BASE + "/users/login";

  // Contest Routes
  static CONTESTS = this._BASE + "/contests";
  static CONTEST = (id: string) => this._BASE + `/contests/${id}`;
  static MANAGE_CONTEST = this._BASE + "/manage/contests";
  static CONTEST_BY_ID = (id: string) => this._BASE + `/manage/contests/${id}`;
  static NEW_CONTEST = this._BASE + "/manage/contests/add";
  static UPDATE_CONTEST = this._BASE + "/manage/contests/update";

  // User Routes
  static DETAILS = this._BASE + "/users/details";
  static HISTORY = this._BASE + "/users/history";
  static SEARCH = this._BASE + "/users/search";
}

export default ApiRoutes;

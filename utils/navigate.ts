import { Routes } from "../app/routes";

export const routeToContest = (id: string) => {
  window.location.href = `${Routes.CONTESTS}/${id}`;
};

export const routeToLeaderboard = (id: string) => {
  window.location.href = `${Routes.CONTESTS}/${id}/leaderboard`;
};

export const routeToParticipate = (id: string) => {
  window.location.href = `${Routes.CONTESTS}/${id}/register`;
};

export const routeToEditContest = (id: string) => {
  window.location.href = `${Routes.MANAGE_CONTESTS}/${id}`;
};

export const routeToDeleteContest = (id: string) => {
  window.location.href = `${Routes.MANAGE_CONTESTS}/${id}/delete`;
};

export const routeToProfile = (id: string) => {
  window.location.href = `${Routes.PROFILE}/${id}`;
};

export const routeToProblem = (id: string) => {
  window.location.href = `${Routes.PROBLEMS}/${id}`;
};

export const routeToProblemSubmissions = (id: string) => {
  window.location.href = `${Routes.PROBLEMS}/${id}/submissions`;
};

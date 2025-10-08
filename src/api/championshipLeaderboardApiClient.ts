import axiosInstance from "./axiosInstance";
import type { UserTeam } from "./userTeamApiClient";

export interface ChampionshipLeaderboard {
  leaderboardUid: string;
  leaderboardName: string;
}

interface ChampionshipLeaderboardListResponse {
    leaderboardList: Array<ChampionshipLeaderboard>;
    }

export interface ChampionshipLeaderboardResponse {
    championshipLeaderboard: ChampionshipLeaderboard;
    entries: number;
    topTen: Array<UserTeam>;
    }

export async function getAllLeaderboards(): Promise<ChampionshipLeaderboardListResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/championship-leaderboard/all");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch user team");
  }
}

export async function getGlobalLeaderboard (): Promise<ChampionshipLeaderboardResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/championship-leaderboard/global");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch user team");
  }
}
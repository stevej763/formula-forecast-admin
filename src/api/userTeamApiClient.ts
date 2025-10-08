import axiosInstance from "./axiosInstance";

export interface UserTeam {
    teamUid: string;
    teamName: string;
    teamColour: string; // Hex color code, e.g. "#FF5733"
    accountUid: string;
}

export interface UserTeamResponse {
    teamDetailsDto: UserTeam;
}

export interface AllUserTeamsResponse {
    teamDetailsList: Array<UserTeam>;
}

export interface CreateUserTeamRequest {
    teamName: string;
    teamColour: string; // Hex color code, e.g. "#FF5733"
}

export async function getUserTeam(): Promise<UserTeamResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/team");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch user team");
  }
}


export async function getAllTeams(): Promise<AllUserTeamsResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/team/all");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch all teams");
  }
}

export async function createUserTeam(teamName: string, teamColour: string) {
  try {
    const response = await axiosInstance.post("/api/v1/team/create", {
      teamName,
      teamColour
    } as CreateUserTeamRequest);
    console.log("Create team response:", response);
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to create user team");
  }
}

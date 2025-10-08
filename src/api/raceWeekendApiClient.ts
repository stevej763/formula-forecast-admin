export type PracticeSessionResponse = {
  practiceSessionUid: string;
  sessionNumber: number;
  sessionDate: string; // ISO date string
};

export type QualifyingResponse = {
  qualifyingSessionUid: string;
  sessionDate: string; // ISO date string
};

export type SprintResponse = {
  sprintSessionUid: string;
  sessionDate: string; // ISO date string
};

export type RaceResponse = {
  raceSessionUid: string;
  sessionDate: string; // ISO date string
};

export type RaceWeekendStatus = "UPCOMING" | "RACE_WEEK" | "LIVE" | "COMPLETE";

export type RaceWeekend = {
  raceWeekendUid: string;
  raceName: string;
  raceLocation: string;
  practiceSessions: Array<PracticeSessionResponse>;
  qualifying: QualifyingResponse;
  sprintResponse?: SprintResponse;
  raceResponse: RaceResponse;
  complete: boolean;
  liveWeekend: boolean;
  raceWeekendStartDate: string; // ISO date string
  raceWeekendEndDate: string; // ISO date string
  raceWeekendStatus: RaceWeekendStatus; // e.g. "UPCOMING", "LIVE", "COMPLETED"
  raceWeekendStatusTimestamp: string; // ISO datetime string
};

export type RaceWeekendResponse = {
  raceWeekendResponse?: RaceWeekend;
};

export type RaceWeekends = {
  raceWeekendResponses: RaceWeekend[];
};

import axiosInstance from "./axiosInstance";

export async function fetchAllRaceWeekends(): Promise<RaceWeekends> {
  try {
    const response = await axiosInstance.get("/api/v1/race-weekend/all");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch race weekends");
  }
}

export async function fetchRaceWeekendByUid(raceWeekendUid: string): Promise<RaceWeekend> {
  try {
    const response = await axiosInstance.get(`/api/v1/race-weekend/${raceWeekendUid}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch race weekend");
  }
}

export async function fetchCurrentRaceWeekend(): Promise<RaceWeekendResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/race-weekend/current");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch race weekend");
  }
}

export async function fetchUpcomingRaceWeekend(): Promise<RaceWeekendResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/race-weekend/next");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch race weekend");
  }
}

export async function fetchLiveRaceWeekend(): Promise<RaceWeekendResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/race-weekend/live");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to fetch race weekend");
  }
}

export interface CreateRaceWeekendRequest {
  raceName: string;
  raceLocation: string;
  raceWeekendStartDate: string;
  raceWeekendEndDate: string;
}

export async function createRaceWeekend(raceWeekend: CreateRaceWeekendRequest): Promise<RaceWeekend> {
  try {
    const response = await axiosInstance.post("/api/v1/race-weekend", raceWeekend);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to create race weekend");
  }
}

import axiosInstance from './axiosInstance';

export interface Season {
  championshipSeasonUid: string;
  championshipYear: number;
  championshipName: string;
}

interface GetAllSeasonsResponse {
  seasons: Season[];
}

interface CreateSeasonRequest {
  year: number;
  name: string;
}

export const getAllSeasons = async (): Promise<GetAllSeasonsResponse> => {
  const response = await axiosInstance.get<GetAllSeasonsResponse>('/api/v1/championship-season/all');
  return response.data;
};

export const createSeason = async (season: CreateSeasonRequest): Promise<Season> => {
  const response = await axiosInstance.post<Season>('/api/v1/championship-season/create', season);
  return response.data;
};
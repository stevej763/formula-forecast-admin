import axiosInstance from "./axiosInstance";

export interface ResultDriver {
  driverUid: string;
  rank: number;
}

export interface PredictionResult {
  predictionTypeUid: string;
  drivers: ResultDriver[];
}

export interface PredictionResultsResponse {
  raceWeekendUid: string;
  results: PredictionResult[];
}

export interface ResultSubmissionResponse {
  predictionsScored: number;
}

export async function fetchResults(raceWeekendUid: string): Promise<PredictionResultsResponse> {
  const response = await axiosInstance.get(`/api/v1/race-weekend/${raceWeekendUid}/results`);
  return response.data;
}

/** Enters or corrects the result for one prediction type, which re-scores every team's prediction of that type. */
export async function submitResult(
  raceWeekendUid: string,
  predictionTypeUid: string,
  drivers: ResultDriver[],
): Promise<ResultSubmissionResponse> {
  const response = await axiosInstance.put(`/api/v1/race-weekend/${raceWeekendUid}/results/${predictionTypeUid}`, { drivers });
  return response.data;
}

import axiosInstance from "./axiosInstance";

export interface FastestLapPrediction {
    userTeamUid: string;
    raceWeekendUid: string;
    driverUid: string;
    predictionTypeUid: string;
}

export interface PredictionType {
    predictionTypeUid: string;
    predictionType: string;
    description: string;
    /** How many ranked picks the type takes: 1 for a single driver, 3 for a top three. */
    selectionCount: number;
}   

export type PredictionTypes = {
    predictionTypes: Array<PredictionType>
}

export const submitFastestLapPrediction = async (fastestLapPrediction: FastestLapPrediction) => {
    try {
        const response = await axiosInstance.post(`/api/v1/predictions/make-prediction/fastest-lap`, 
            fastestLapPrediction,
            {
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting fastest lap prediction:", error);
        throw error;
    }
};

export const fetchPredictionTypes = async () : Promise<PredictionTypes> => {
    try {
        const response = await axiosInstance.get(`/api/v1/predictions/types`);
        return response.data;
    } catch (error) {
        console.error("Error fetching prediction types:", error);
        throw error;
    }
};

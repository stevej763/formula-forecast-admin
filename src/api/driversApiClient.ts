import axiosInstance from "./axiosInstance";

interface Driver {
    driverUid: string;
    firstName: string;
    lastName: string;
    nickname: string;
    nationality: string;
    dateOfBirth: string;
}

interface CreateDriverRequest {
  firstName: string;
  lastName: string;
  nickname: string;
  nationality: string;
  dateOfBirth: string;
}

interface DriversResponse {
  drivers: Driver[];
}

interface CreateDriverResponse {
  driver: Driver;
}

export async function getAllDrivers(): Promise<DriversResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/driver/all");
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to fetch all drivers");
  }
}

export async function createDriver(driverData: CreateDriverRequest): Promise<CreateDriverResponse> {
  try {
    const response = await axiosInstance.post("/api/v1/driver/create", driverData);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to create driver");
  }
}
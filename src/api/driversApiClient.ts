import axiosInstance from "./axiosInstance";

export interface Driver {
    driverUid: string;
    firstName: string;
    lastName: string;
    nickname: string;
    nationality: string;
    dateOfBirth: string;
    constructorUid?: string;
    teamName?: string;
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

interface SetDriverConstructorRequest {
  driverUid: string;
  constructorUid: string;
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

/** Drivers on the grid for the current season. */
export async function getActiveDrivers(): Promise<DriversResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/driver/all/active");
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to fetch drivers");
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

export async function setDriverConstructor(request: SetDriverConstructorRequest) {
  try {
    const response = await axiosInstance.post("/api/v1/driver/set-constructor", request);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Failed to set driver constructor");
  }
}
import axiosInstance from './axiosInstance';
import type { Constructor } from '../pages/authenticated/tabs/config/ConstructorTableColumns';

interface GetAllConstructorsResponse {
  constructors: Constructor[];
}

interface CreateConstructorRequest {
  name: string;
  nationality: string;
}

export const getAllConstructors = async (): Promise<GetAllConstructorsResponse> => {
  const response = await axiosInstance.get<GetAllConstructorsResponse>('/api/v1/constructor/all');
  return response.data;
};

export const createConstructor = async (constructor: CreateConstructorRequest): Promise<Constructor> => {
  const response = await axiosInstance.post<Constructor>('/api/v1/constructor/create', constructor);
  return response.data;
};
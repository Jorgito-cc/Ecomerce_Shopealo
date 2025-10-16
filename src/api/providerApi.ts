import { http } from "./http";
import type { ProviderDTO, CreateProviderDTO, UpdateProviderDTO } from "../types/provider";

// GET /provider
export const getProviders = async (): Promise<ProviderDTO[]> => {
  const { data } = await http.get<ProviderDTO[]>("/api/v1/provider");
  return data;
};

// GET /provider/:id
export const getProviderById = async (id: number): Promise<ProviderDTO> => {
  const { data } = await http.get<ProviderDTO>(`/api/v1/provider/${id}`);
  return data;
};

// POST /provider
export const createProvider = async (payload: CreateProviderDTO): Promise<ProviderDTO> => {
  const { data } = await http.post<ProviderDTO>("/api/v1/provider", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

// PATCH /provider/:id
export const updateProvider = async (
  id: number,
  payload: UpdateProviderDTO
): Promise<ProviderDTO> => {
  const { data } = await http.patch<ProviderDTO>(
    `/api/v1/provider/${id}`,
    payload // ✅ sin stringify, sin headers forzados
  );
  return data;
};



// DELETE /provider/:id
export const deleteProvider = async (id: number): Promise<void> => {
  await http.delete(`/api/v1/provider/${id}`);
};

// src/api/reportApi.ts
import { http } from "./http";

export interface ReportFilter {
  dateStart?: string;
  dateEnd?: string;
  status?: string;
  minTotal?: number;
  maxTotal?: number;
  productName?: string;
}

export const getFilteredOrders = async (filters: ReportFilter) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No autenticado.");

  const params = new URLSearchParams();
  if (filters.dateStart) params.append("dateStart", filters.dateStart);
  if (filters.dateEnd) params.append("dateEnd", filters.dateEnd);
  if (filters.status) params.append("status", filters.status);
  if (filters.minTotal) params.append("minTotal", filters.minTotal.toString());
  if (filters.maxTotal) params.append("maxTotal", filters.maxTotal.toString());
  if (filters.productName) params.append("productName", filters.productName);

  const { data } = await http.get(`/api/v1/order?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// services/SmdAPIs.ts
import apiClient from "../api/client";

export interface CreateSmdPayload {
  smd_code: string;
  title?: string;
  purchase_price: number;
}

export interface GetSmdParams {
  customer_id: string;
}

export const SmdAPIs = {
  addSmd: async (payload: CreateSmdPayload) => {
    const response = await apiClient.post("/add-smd", payload);
    return response.data;
  },
  getSmd: async ( customer_id: GetSmdParams ) => {
    const response = await apiClient.get("/smds", {
      params: { customer_id },
    } );
    return response.data;
  },
};



export const dealService = {
  searchCustomers: async (q: string) => {
    const { data } = await apiClient.get(`/customers/search?q=${q}`);
    console.log(data);
    return data.map((c: any) => ({
      value: c.customer_id,
      label: c.full_name,
    }));
  },

  searchMarketers: async (q: string) => {
    const { data } = await apiClient.get(`/marketers/search?q=${q}`);
    return data.map((m: any) => ({
      value: m.user_id,
      label: m.full_name,
    }));
  },

  searchSmds: async (q: string) => {
    const { data } = await apiClient.get(`/smds/search?q=${q}`);
    return data.map((s: any) => ({
      value: s.smd_id,
      label: s.smd_code,
    }));
  },

  closeDeal: (payload: any) =>
    apiClient.post("/smd-closings", payload),
};

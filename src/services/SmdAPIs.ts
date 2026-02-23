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
  getSmd: async ( customer_id: string ) => {
    const response = await apiClient.get("/smds", {
      params: { customer_id },
    } );
    return response.data;
  },

  getAll: async (page: number, search?: string) => {
    const response = await apiClient.get("/smds", {
      params: {
        page,
        search,
      },
    });
    return response.data;
  },

  getBySmdId: async (smd_id: string) => {
    const response = await apiClient.get(`/smds/${smd_id}`);
    return response.data;
  },

  getsmdByCustomer: async (customer_id: string) => {
    const response = await apiClient.get(`/smds/customer/${customer_id}`);
    return response.data;
  },


  deleteSmd: async (smd_id: string) => {
    const response = await apiClient.delete(`/smds/${smd_id}`);
    return response.data;
  },

  update: async (smd_id: string, payload: Partial<CreateSmdPayload>) => {
    const response = await apiClient.put(`/smds/${smd_id}`, payload);
    return response.data;
  }


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

  getClosedDeals: async (params: { page: number; search?: string; }) => {
    const response = await apiClient.get("/smd-closings", {
      params,
    });
    return response.data;
  },
};

import apiClient from "../api/client";
import { type MarketerForm } from "../components/MarketerForm";
import { toast } from "react-hot-toast";

interface GetMarketersParams {
  page?: number;
  limit?: number;
  search?: string;          // email
  commission_type?: "fixed" | "percentage";
}

export const MarketerAPIs = {
  addMarketer: async (data: MarketerForm) => {
    try {
      const response = await apiClient.post("/create-marketer", data);
      toast.success("Marketer created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create marketer");
      throw error;
    }
  },

  getMarketers: async (params: GetMarketersParams = {}) => {
    try {
      const response = await apiClient.get("/marketers", {
        params, // 👈 search & commission_type go here
      });
      return response.data;
    } catch (error: any) {
      toast.error("Failed to fetch marketers");
      throw error;
    }
  },

  updateMarketer: async (id: string, payload: any) => {
    try {
      const response = await apiClient.put(`/marketers/${id}`, payload);
      toast.success("Commission updated");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update marketer");
      throw error;
    }
  },

  deleteMarketer: async (id: string) => {
    try {
      await apiClient.delete(`/marketers/${id}`);
      toast.success("Marketer deleted");
    } catch (error: any) {
      toast.error("Failed to delete marketer");
      throw error;
    }
  },
};

export const MarketerDashboardAPIs = {
  getSummary: async () => {
    const response = await apiClient.get("/marketer/dashboard/summary");
    return response.data;
  },

  getEarnings: async () => {
    const response = await apiClient.get("/marketer/dashboard/earnings");
    return response.data.data;
  },

  getCustomers: async () => {
    const response = await apiClient.get("/marketer/dashboard/customers");
    return response.data.data;
  }


}
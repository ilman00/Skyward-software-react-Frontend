// services/MarketerAPIs.ts
import apiClient from "../api/client";
import { type MarketerForm } from "../components/MarketerForm";

export const MarketerAPIs = {
  addMarketer: async (data: MarketerForm) => {
    const response = await apiClient.post("/create-marketer", data);
    return response.data;
  },
  getMarketer: async () => {
    const response = await apiClient.get("/marketer");
    return response.data;
  },

};
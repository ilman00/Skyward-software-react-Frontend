// services/PayoutAPIs.ts
import apiClient from "../api/client";
import {type  RentPayoutFormData } from "../components/Payout/RentPayoutForm";

export const PayoutAPIs = {
  createRentPayout: async (data: RentPayoutFormData) => {
    const response = await apiClient.post("/monthly-payout", data);
    return response.data;
  },
  getRentPayouts: async (page: number) => {
    const response = await apiClient.get("/monthly-payout", {
      params: { page },
    });
    return response.data;
  },
  deleteRentPayout: async (id: string) => {
    const response = await apiClient.delete(`/monthly-payout/${id}`);
    return response.data;
  },

};
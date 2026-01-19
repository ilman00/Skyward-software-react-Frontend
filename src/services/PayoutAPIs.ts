// services/PayoutAPIs.ts
import apiClient from "../api/client";
import {type  RentPayoutFormData } from "../components/Payout/RentPayoutForm";

export const PayoutAPIs = {
  createRentPayout: async (data: RentPayoutFormData) => {
    const response = await apiClient.post("/monthly-payout", data);
    return response.data;
  },
};
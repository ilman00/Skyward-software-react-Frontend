import apiClient from "../api/client";

export interface DashboardStats {
  total_customers: number;
  customers_this_month: number;
  customer_trend: number | null;

  active_marketers: number;
  marketers_this_month: number;

  total_smds: number;
  smds_this_month: number;
  smd_trend: number | null;

  monthly_rent_liability: number;
  pending_rent_payouts_this_month: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get<{ success: boolean; data: DashboardStats }>(
    "/dashboard/stats"
  );
  return response.data.data;
};
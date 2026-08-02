// src/services/TransactionAPIs.ts
import apiClient from "../api/client";

export interface PeriodSummary {
  total_in: number;
  total_out: number;
  revenue: number;
  rent_paid_out: number;
  commission_paid_out: number;
}

export interface TrendPoint {
  date: string;
  total_in: number;
  total_out: number;
}

export interface TransactionSummary {
  today: PeriodSummary;
  this_week: PeriodSummary;
  this_month: PeriodSummary;
  trend: TrendPoint[];
}

export const getTransactionSummary = async (): Promise<TransactionSummary> => {
  const { data } = await apiClient.get<TransactionSummary>("/transactions/summary");
  return data;
};
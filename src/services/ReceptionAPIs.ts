import apiClient from "../api/client";
// import toast from "react-hot-toast";

export interface Visitor {
  visitor_id: string;
  full_name: string;
  host_name: string | null;
  checked_in_at: string;
  checked_out_at: string | null;
  recorded_by: string;
  created_at: string;
}

export interface CheckInPayload {
  full_name: string;
  host_name?: string;
  checked_in_at: string;
  checked_out_at?: string;
}

export interface UpdateVisitorPayload {
  full_name?: string;
  host_name?: string;
  checked_in_at?: string;
  checked_out_at?: string;
}

export interface VisitorsResponse {
  data: Visitor[];
  total_pages: number;
}

export const ReceptionAPIs = {
  checkIn: async (payload: CheckInPayload): Promise<Visitor> => {
    const response = await apiClient.post("/reception/visitors", payload);
    return response.data.data;
  },

  updateVisitor: async (id: string, payload: UpdateVisitorPayload): Promise<Visitor> => {
    const response = await apiClient.patch(`/reception/visitors/${id}`, payload);
    return response.data.data;
  },

  deleteVisitor: async (id: string): Promise<void> => {
    await apiClient.delete(`/reception/visitors/${id}`);
  },

  getVisitors: async (page: number = 1, limit: number = 10): Promise<VisitorsResponse> => {
    const response = await apiClient.get("/reception/visitors", { params: { page, limit } });
    return response.data;
  },
};
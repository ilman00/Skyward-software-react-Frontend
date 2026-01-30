import apiClient from "../api/client";
import { type StaffMember } from "../components/Staff/StaffList";

/* -------- Types -------- */

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface GetUsersResponse {
  data: StaffMember[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

/* -------- API -------- */

export const UserAPI = {
  /** Get users (pagination + filters) */
  getUsers: async (params?: GetUsersParams): Promise<GetUsersResponse> => {
    const { data } = await apiClient.get("/users", { params });
    return data;
  },

  /** Update user (name / role) */
  updateUser: async (
    id: string,
    payload: Partial<Pick<StaffMember, "full_name" | "role_name">>
  ): Promise<StaffMember> => {
    const { data } = await apiClient.put(`/users/${id}`, payload);
    return data;
  },

  /** Delete user */
  deleteUser: async (id: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete(`/users/${id}`);
    return data;
  }
};

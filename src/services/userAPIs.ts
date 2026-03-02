import apiClient from "../api/client";
import { type StaffMember } from "../components/Staff/StaffList";
import { type ClientMember } from "../components/user/UserList";

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

// A reusable wrapper for any paginated data from your backend
export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[]; // 'T' will be replaced by ClientMember, Product, etc.
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface BusinessRolePayload {
  add_roles?: string[];
  remove_roles?: string[];
}

/* -------- API -------- */

export const UserAPI = {
  /** Get users (pagination + filters) */
  getUsers: async (params?: GetUsersParams): Promise<GetUsersResponse> => {
    const { data } = await apiClient.get("/staff", { params });
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

export const UserPageAPI = {
  getUsers: async (params?: GetUsersParams): Promise<PaginatedResponse<ClientMember>> => {
    const { data } = await apiClient.get("/users/market-participants", { params });
    return data;
  },
  updateBusinessRoles: async (userId: string, payload: BusinessRolePayload) => {
    const { data } = await apiClient.put(`/users/${userId}/business-roles`, payload);
    return data;
  },

  deleteUser: async (userId: string) => {
    const { data } = await apiClient.delete(`/users/${userId}`);
    return data;
  }
}
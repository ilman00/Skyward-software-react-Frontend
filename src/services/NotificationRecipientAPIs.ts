// src/services/NotificationRecipientAPIs.ts
import apiClient from "../api/client";

export interface NotificationRecipient {
  recipient_id: string;
  name: string;
  email: string;
  role_label: string | null;
  is_active: number; // mysql2 returns 0/1
  created_at: string;
}

export const getNotificationRecipients = async (): Promise<NotificationRecipient[]> => {
  const { data } = await apiClient.get<{ data: NotificationRecipient[] }>("/notification-recipients");
  return data.data;
};

export const createNotificationRecipient = async (payload: {
  name: string;
  email: string;
  role_label?: string;
}) => {
  const { data } = await apiClient.post("/notification-recipients", payload);
  return data;
};

export const updateRecipientStatus = async (recipientId: string, isActive: boolean) => {
  const { data } = await apiClient.patch(`/notification-recipients/${recipientId}/status`, {
    is_active: isActive,
  });
  return data;
};

export const deleteNotificationRecipient = async (recipientId: string) => {
  const { data } = await apiClient.delete(`/notification-recipients/${recipientId}`);
  return data;
};
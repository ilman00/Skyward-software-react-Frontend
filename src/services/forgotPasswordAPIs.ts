import apiClient from "../api/client";

export const ForgotPasswordAPIs = {
  sendOtp: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await apiClient.post("/auth/verify-forgot-otp", { email, otp });
    return response.data; // { message, resetToken }
  },

  resetPassword: async (resetToken: string, newPassword: string) => {
    const response = await apiClient.post("/auth/reset-password", {
      resetToken,
      newPassword,
    });
    return response.data;
  },
};
import client from "../api/client";


export const getStaffDashboardData =  {

    getDashboardSummary: async () => {
        const response = await client.get("/staff/dashboard/summary");
        return response.data;
    },

    getNotifications: async () => {
        const response = await client.get("/staff/dashboard/notifications");
        return response.data;
    }

}


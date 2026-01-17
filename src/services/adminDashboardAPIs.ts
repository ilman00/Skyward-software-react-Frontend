import apiCLient from "../api/client"
export const AdminDashboardAPIs = {

    getStats: async () => {
        const response = await apiCLient.get("/admin/dashboard/stats");
        return response.data;
    },

    

}
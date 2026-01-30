import apiClient from "../api/client";


export const CustomerAPIs = {

    addCustomer: async (customerData: any) => {
        const response =  await apiClient.post("/create-customer", customerData);
        return response.data;
    },
    getCustomers: async ( page: number) => {
        const response = await apiClient.get("/customers", {
            params: { page },
        });
        return response.data;
    },

    updateCustomer: async (customerId: string, customerData: any) => {
        const response = await apiClient.put(`/customers/${customerId}`, customerData);
        return response.data;
    },

    deleteCustomer: async (customerId: string) => {
        const response = await apiClient.delete(`/customers/${customerId}`);
        return response.data;
    },

    searchCustomers: async (query: string) => {
        const response = await apiClient.get("/customers/search", {
            params: { q: query },
        });
        return response;
    }

}


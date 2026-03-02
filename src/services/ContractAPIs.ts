import client from "../api/client";


export const contractAPI = {
  getContracts: async (params: { page: number; search: string, limit?: number }) => {
    const response = await client.get("/deals", { params });
    return response.data;
  },

  generateContractPDF: async (contractId: string) => {
    const response = await client.get(`/preview-deal/${contractId}`, {
      responseType: "blob", // Important for handling PDF files
    });
    return response.data; // This will be the PDF blob
  }
  
  // You can add more contract-related API methods here (e.g., getContractById, createContract, etc.)
};



import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomerForm, { type CustomerFormData } from "../../components/Customers/CustomerForm";
import { CustomerAPIs } from "../../services/CustomerAPIs";

const CustomerFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCustomer = async (data: CustomerFormData) => {
    try {
      // Using toast.promise to manage all UI feedback states
      await toast.promise(
        CustomerAPIs.addCustomer(data),
        {
          loading: 'Creating customer account...',
          success: 'Customer added successfully!',
          error: (err) => err?.response?.data?.message || 'Failed to create customer.',
        }
      );

      // Delay navigation slightly so the user sees the success toast
      setTimeout(() => navigate("/admin-dashboard"), 1500);
      
    } catch (error) {
      // Logic for specific error handling can go here if needed
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      
      <CustomerForm onSubmit={handleCreateCustomer} />
    </div>
  );
};

export default CustomerFormPage;
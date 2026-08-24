import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeForm from "../../components/Employees/EmployeeForm";
import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
  type EmployeeDetail,
  type EmployeeFormValues,
} from "../../services/EmployeeAPIs";

const EmployeeFormPage: React.FC = () => {
  const { id: employeeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(employeeId);

  const [initialData, setInitialData] = useState<EmployeeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (!employeeId) return;

    const loadEmployee = async () => {
      try {
        setIsLoading(true);
        const data = await getEmployeeById(employeeId);
        setInitialData(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load employee");
        navigate("/employees");
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployee();
  }, [employeeId, navigate]);

  const handleSubmit = async (formValues: EmployeeFormValues) => {
    try {
      await toast.promise(
        isEditMode
          ? updateEmployee(employeeId as string, formValues)
          : createEmployee(formValues),
        {
          loading: isEditMode ? "Updating employee..." : "Creating employee...",
          success: isEditMode
            ? "Employee updated successfully!"
            : "Employee created successfully!",
          error: (err) => {
            console.error("Employee save error:", err);
            return err?.response?.data?.message || "Failed to save employee";
          },
        }
      );
      navigate("/employees");
    } catch (error) {
      console.error("Catch block error:", error);
    }
  };

  if (isEditMode && isLoading) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading employee...
      </div>
    );
  }

  return (
    <div className="p-4">
      <EmployeeForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default EmployeeFormPage;
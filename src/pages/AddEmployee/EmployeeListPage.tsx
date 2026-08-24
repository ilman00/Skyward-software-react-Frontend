import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeList from "../../components/Employees/EmployeeList";
import {
  getEmployeesForAdmin,
  deleteEmployee,
  type EmployeeListItem,
} from "../../services/EmployeeAPIs";

const EmployeeListPage: React.FC = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await getEmployeesForAdmin();
      setEmployees(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load employees");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = () => {
    navigate("/employees/new");
  };

  const handleEdit = (employeeId: string) => {
    navigate(`/employees/${employeeId}/edit`);
  };

  const handleDelete = async (employeeId: string) => {
    const previousEmployees = employees;

    // Optimistic removal — reverted in the catch block if the request fails
    setEmployees((prev) => prev.filter((e) => e.employee_id !== employeeId));

    try {
      await toast.promise(deleteEmployee(employeeId), {
        loading: "Removing employee...",
        success: "Employee removed from the website",
        error: (err) => {
          console.error("Delete employee error:", err);
          return err?.response?.data?.message || "Failed to remove employee";
        },
      });
    } catch (error) {
      console.error("Catch block error:", error);
      setEmployees(previousEmployees);
    }
  };

  return (
    <div className="p-4">
      <EmployeeList
        employees={employees}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeListPage;
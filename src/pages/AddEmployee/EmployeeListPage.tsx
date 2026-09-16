import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmployeeList from "../../components/Employees/EmployeeList";
import {
  getEmployeesForAdmin,
  deleteEmployee,
  type EmployeeListItem,
  reorderEmployee,
} from "../../services/EmployeeAPIs";

const EmployeeListPage: React.FC = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReordering, setIsReordering] = useState(false);

  const handleReorder = async (employeeId: string, newPosition: number) => {
    const previous = employees;

    // Optimistic: rearrange locally so the row moves on click, not on response.
    const next = [...employees];
    const currentIndex = next.findIndex((e) => e.employee_id === employeeId);
    if (currentIndex === -1) return;

    const [moved] = next.splice(currentIndex, 1);
    next.splice(Math.min(newPosition - 1, next.length), 0, moved);
    setEmployees(next);

    setIsReordering(true);
    try {
      await reorderEmployee(employeeId, newPosition);
    } catch (error) {
      setEmployees(previous);
      toast.error("Failed to reorder");
      console.error(error);
    } finally {
      setIsReordering(false);
    }
  };

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
        onReorder={handleReorder}
        isReordering={isReordering}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeListPage;
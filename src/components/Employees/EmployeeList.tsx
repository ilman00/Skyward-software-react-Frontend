import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  User,
  Users,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import type { EmployeeListItem } from "../../services/EmployeeAPIs";

interface Props {
  employees: EmployeeListItem[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (employeeId: string) => void;
  onDelete: (employeeId: string) => void;
}

const CONFIRM_TIMEOUT_MS = 4000;

const EmployeeList: React.FC<Props> = ({
  employees,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDeleteClick = (employeeId: string) => {
    if (confirmingId === employeeId) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setConfirmingId(null);
      onDelete(employeeId);
      return;
    }

    setConfirmingId(employeeId);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setConfirmingId(null), CONFIRM_TIMEOUT_MS);
  };

  const cancelConfirm = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setConfirmingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            <p className="text-sm text-gray-500">
              Manage profiles shown on the public team directory
            </p>
          </div>

          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-all shadow-sm shadow-blue-200"
          >
            <Plus size={18} />
            Add Employee
          </button>
        </div>

        {/* Card */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users size={20} className="text-blue-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              All Employees {!isLoading && `(${employees.length})`}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
              <Loader2 size={18} className="animate-spin" />
              Loading employees...
            </div>
          ) : employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="p-3 bg-gray-100 rounded-full mb-3">
                <Users size={24} className="text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700">No employees yet</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">
                Add your first employee to show them on the team directory
              </p>
              <button
                onClick={onAdd}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
                Add Employee
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-8 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Designation
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-8 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {employees.map((employee) => {
                    const isConfirming = confirmingId === employee.employee_id;
                    const isVisible = employee.status !== "hidden";

                    return (
                      <tr
                        key={employee.employee_id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                              {employee.photo_url ? (
                                <img
                                  src={employee.photo_url}
                                  alt={employee.full_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User size={16} className="text-gray-300" />
                              )}
                            </div>
                            <span className="text-sm font-semibold text-gray-800">
                              {employee.full_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {employee.designation}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              isVisible
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                            {isVisible ? "Visible" : "Hidden"}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onEdit(employee.employee_id)}
                              className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                              aria-label={`Edit ${employee.full_name}`}
                            >
                              <Pencil size={16} />
                            </button>

                            {isConfirming ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeleteClick(employee.employee_id)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <Check size={14} />
                                  Confirm
                                </button>
                                <button
                                  onClick={cancelConfirm}
                                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                  aria-label="Cancel"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleDeleteClick(employee.employee_id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label={`Remove ${employee.full_name}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default EmployeeList;
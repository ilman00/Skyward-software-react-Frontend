import apiClient from "../api/client";

/* ------------------ TYPES ------------------ */

export interface EmployeeListItem {
  employee_id: string;
  slug: string;
  full_name: string;
  designation: string;
  photo_url: string | null;
  display_order: number;
  status?: "active" | "hidden";
}

export interface EmployeeDetail extends EmployeeListItem {
  content: string;
  status: "active" | "hidden";
  created_at?: string;
  updated_at?: string;
}

export interface EmployeeFormValues {
  full_name: string;
  designation: string;
  content: string;
  display_order?: number;
  status?: "active" | "hidden";
  slug?: string;
  photo?: File | null;
}

/* ------------------ HELPERS ------------------ */

/**
 * Builds a FormData payload from form values. `photo` is only appended
 * when a new file was selected — omitting it on update leaves the
 * existing Cloudinary image untouched (per the backend contract).
 */
const buildEmployeeFormData = (values: EmployeeFormValues): FormData => {
  const formData = new FormData();
  formData.append("full_name", values.full_name);
  formData.append("designation", values.designation);
  formData.append("content", values.content ?? "");

  if (values.display_order !== undefined) {
    formData.append("display_order", String(values.display_order));
  }
  if (values.status) {
    formData.append("status", values.status);
  }
  if (values.slug) {
    formData.append("slug", values.slug);
  }
  if (values.photo) {
    formData.append("photo", values.photo);
  }

  return formData;
};

/* ------------------ API CALLS ------------------ */

export const getEmployees = async (): Promise<EmployeeListItem[]> => {
  const response = await apiClient.get<{ success: boolean; data: EmployeeListItem[] }>(
    "/employees"
  );
  return response.data.data;
};

/**
 * Admin-only listing — returns every employee regardless of status,
 * for the internal management table (public getEmployees only
 * returns active ones).
 */
export const getEmployeesForAdmin = async (): Promise<EmployeeListItem[]> => {
  const response = await apiClient.get<{ success: boolean; data: EmployeeListItem[] }>(
    "/employees/admin"
  );
  return response.data.data;
};

export const getEmployeeById = async (employeeId: string): Promise<EmployeeDetail> => {
  const response = await apiClient.get<{ success: boolean; data: EmployeeDetail }>(
    `/employees/${employeeId}`
  );
  return response.data.data;
};

export const createEmployee = async (
  values: EmployeeFormValues
): Promise<EmployeeDetail> => {
  const formData = buildEmployeeFormData(values);

  // Overriding Content-Type here so the browser sets the multipart
  // boundary itself, instead of apiClient's default "application/json".
  const response = await apiClient.post<{ success: boolean; data: EmployeeDetail }>(
    "/employees",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data.data;
};

export const updateEmployee = async (
  employeeId: string,
  values: EmployeeFormValues
): Promise<EmployeeDetail> => {
  const formData = buildEmployeeFormData(values);

  const response = await apiClient.put<{ success: boolean; data: EmployeeDetail }>(
    `/employees/${employeeId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data.data;
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
  await apiClient.delete(`/employees/${employeeId}`);
};
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StaffList, {
  type StaffMember
} from "../../components/Staff/StaffList";
import { UserAPI } from "../../services/userAPIs";

const StaffListPage: React.FC = () => {
  const [users, setUsers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await UserAPI.getUsers({
        page: 1,
        limit: 100
      });
      setUsers(data); // adjust if your response differs
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (
    id: string,
    payload: Partial<StaffMember>
  ) => {
    const toastId = toast.loading("Updating user...");
    try {
      await UserAPI.updateUser(id, payload);
      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === id ? { ...u, ...payload } : u
        )
      );
      toast.success("User updated", { id: toastId });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Update failed",
        { id: toastId }
      );
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    const toastId = toast.loading("Deleting user...");
    try {
      await UserAPI.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.user_id !== id));
      toast.success("User deleted", { id: toastId });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Delete failed",
        { id: toastId }
      );
    }
  };

  return (
    <StaffList
      data={users}
      loading={loading}
      onUpdate={updateUser}
      onDelete={deleteUser}
    />
  );
};

export default StaffListPage;

import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import UserList, { type ClientMember } from "../../components/user/UserList";
import { useDebounce } from "../../hooks/useDebounce";
import { UserPageAPI, type BusinessRolePayload } from "../../services/userAPIs";

const ClientManagementPage: React.FC = () => {
  const [users, setUsers] = useState<ClientMember[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination & Search State
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Load Data via Service
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await UserPageAPI.getUsers({
        page,
        limit: 8,
        search: debouncedSearch,
      });

      setUsers(res.data || []); 
      setTotal(res.total || 0);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch participants");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Update Roles via Service
  const handleUpdate = async (id: string, payload: BusinessRolePayload) => {
    const tid = toast.loading("Updating permissions...");
    try {
      await UserPageAPI.updateBusinessRoles(id, payload);
      toast.success("User updated successfully", { id: tid });
      loadData(); // Refresh list to get latest state from DB
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed", { id: tid });
    }
  };

  // Delete/Deactivate via Service
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this participant?")) return;
    
    const tid = toast.loading("Processing...");
    try {
      await UserPageAPI.deleteUser(id);
      toast.success("User removed", { id: tid });
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed", { id: tid });
    }
  };

  return (
    <UserList
      title="Market Participants"
      description="Manage customer and marketer roles with server-side synchronization."
      data={users}
      loading={loading}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      total={total}
      currentPage={page}
      onPageChange={setPage}
      onSearchChange={(val) => {
        setSearch(val);
        setPage(1); // Crucial: Reset to page 1 when search query changes
      }}
    />
  );
};

export default ClientManagementPage;
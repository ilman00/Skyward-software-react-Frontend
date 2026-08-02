// src/pages/Admin/NotificationRecipientsPage.tsx
import { type FC, useState, useEffect } from "react";
import { Mail, Trash2, Plus, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";
import {
  getNotificationRecipients,
  createNotificationRecipient,
  updateRecipientStatus,
  deleteNotificationRecipient,
  type NotificationRecipient,
} from "../../services/NotificationRecipientAPIs";

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-700";

const NotificationRecipientsPage: FC = () => {
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role_label: "" });

  const loadRecipients = async () => {
    try {
      setIsLoading(true);
      const data = await getNotificationRecipients();
      setRecipients(data);
    } catch (err) {
      toast.error("Failed to load recipients");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipients();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsSubmitting(true);
    try {
      await createNotificationRecipient({
        name: form.name,
        email: form.email,
        role_label: form.role_label || undefined,
      });
      toast.success("Recipient added");
      setForm({ name: "", email: "", role_label: "" });
      loadRecipients();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to add recipient");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (recipient: NotificationRecipient) => {
    const newStatus = !recipient.is_active;
    // optimistic update
    setRecipients((prev) =>
      prev.map((r) => (r.recipient_id === recipient.recipient_id ? { ...r, is_active: newStatus ? 1 : 0 } : r))
    );
    try {
      await updateRecipientStatus(recipient.recipient_id, newStatus);
    } catch (err) {
      toast.error("Failed to update status");
      loadRecipients(); // revert on failure
    }
  };

  const handleDelete = async (recipient: NotificationRecipient) => {
    if (!window.confirm(`Remove ${recipient.name} from transaction notifications?`)) return;

    try {
      await deleteNotificationRecipient(recipient.recipient_id);
      toast.success("Recipient removed");
      setRecipients((prev) => prev.filter((r) => r.recipient_id !== recipient.recipient_id));
    } catch (err) {
      toast.error("Failed to remove recipient");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transaction Email Notifications</h1>
          <p className="text-sm text-gray-500">
            Executives listed here receive an email whenever money moves in or out of the company.
          </p>
        </div>

        {/* Add form */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus size={20} className="text-blue-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Add Recipient</h2>
          </div>

          <form onSubmit={handleAdd} className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="e.g. Ali Raza"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="e.g. ceo@skywardvision.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Role (optional)</label>
              <input
                type="text"
                value={form.role_label}
                onChange={(e) => setForm({ ...form, role_label: e.target.value })}
                className={inputClass}
                placeholder="e.g. CEO"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={isSubmitting || !form.name || !form.email}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                Add Recipient
              </button>
            </div>
          </form>
        </section>

        {/* List */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Mail size={20} className="text-emerald-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Current Recipients</h2>
          </div>

          {isLoading ? (
            <div className="p-8 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recipients.length === 0 ? (
            <p className="p-8 text-sm text-gray-500">No recipients added yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {recipients.map((r) => (
                <div key={r.recipient_id} className="flex items-center justify-between px-8 py-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {r.name}
                      {r.role_label && (
                        <span className="ml-2 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                          {r.role_label}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{r.email}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggle(r)}
                      className="flex items-center gap-1.5 text-sm font-medium"
                      title={r.is_active ? "Active — click to disable" : "Inactive — click to enable"}
                    >
                      {r.is_active ? (
                        <ToggleRight size={22} className="text-emerald-600" />
                      ) : (
                        <ToggleLeft size={22} className="text-gray-400" />
                      )}
                      <span className={r.is_active ? "text-emerald-600" : "text-gray-400"}>
                        {r.is_active ? "Active" : "Inactive"}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDelete(r)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NotificationRecipientsPage;
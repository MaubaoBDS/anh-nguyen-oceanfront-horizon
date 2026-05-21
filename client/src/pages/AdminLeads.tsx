import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Phone, User, Calendar, Tag, StickyNote,
  RefreshCw, ChevronDown, Search, Filter, LogOut
} from "lucide-react";

type LeadStatus = "new" | "contacted" | "interested" | "not_interested" | "closed";

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new:           { label: "Mới",            color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30" },
  contacted:     { label: "Đã liên hệ",     color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  interested:    { label: "Quan tâm",       color: "text-green-400",  bg: "bg-green-400/10 border-green-400/30" },
  not_interested:{ label: "Không quan tâm", color: "text-red-400",    bg: "bg-red-400/10 border-red-400/30" },
  closed:        { label: "Đã chốt",        color: "text-gold",       bg: "bg-gold/10 border-gold/30" },
};

const SOURCE_LABELS: Record<string, string> = {
  form: "Form liên hệ", popup: "Popup", zalo: "Zalo", call: "Gọi điện",
};

function formatDate(d: Date | string) {
  const date = new Date(d);
  return date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminLeads() {
  const { user, loading, isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<LeadStatus>("new");
  const [editNote, setEditNote] = useState("");

  const { data: leads, isLoading, refetch } = trpc.admin.getLeads.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
    refetchInterval: 30000, // auto refresh mỗi 30s
  });

  const updateLead = trpc.admin.updateLeadStatus.useMutation({
    onSuccess: () => { setEditingId(null); refetch(); },
  });

  const utils = trpc.useUtils();

  // Auth guard
  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white/60 text-sm">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-white text-xl font-semibold mb-4">Vui lòng đăng nhập</h2>
          <a href={getLoginUrl()} className="btn-gold px-6 py-3 rounded-lg font-semibold">
            Đăng nhập
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-white text-xl font-semibold mb-2">Không có quyền truy cập</h2>
          <p className="text-white/60 text-sm">Trang này chỉ dành cho quản trị viên.</p>
        </div>
      </div>
    );
  }

  const filtered = (leads || []).filter((l) => {
    const matchSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = (leads || []).reduce(
    (acc, l) => { acc[l.status as LeadStatus] = (acc[l.status as LeadStatus] || 0) + 1; return acc; },
    {} as Record<LeadStatus, number>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Header */}
      <div className="bg-navy border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-white">CRM — Hà Sơn Tower</h1>
            <p className="text-white/50 text-xs mt-0.5">Quản lý danh sách khách hàng tiềm năng</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="text-white/50 hover:text-white transition-colors p-2"
              title="Làm mới"
            >
              <RefreshCw size={16} />
            </button>
            <a href="/" className="text-white/50 hover:text-gold text-xs transition-colors">← Về trang chủ</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {(Object.entries(STATUS_CONFIG) as [LeadStatus, typeof STATUS_CONFIG[LeadStatus]][]).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
              className={`rounded-xl border p-3 text-left transition-all ${
                filterStatus === key ? cfg.bg + " border-opacity-100" : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className={`text-2xl font-bold ${filterStatus === key ? cfg.color : "text-white"}`}>
                {counts[key] || 0}
              </div>
              <div className="text-white/60 text-xs mt-0.5">{cfg.label}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc số điện thoại..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div className="text-white/50 text-sm flex items-center gap-1.5">
            <Filter size={14} />
            {filtered.length} / {leads?.length || 0} lead
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-20 text-white/40">Đang tải dữ liệu...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/40">Chưa có lead nào.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => {
              const cfg = STATUS_CONFIG[lead.status as LeadStatus];
              const isEditing = editingId === lead.id;
              return (
                <div key={lead.id} className="bg-navy rounded-xl border border-white/10 overflow-hidden">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      {/* Left: info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white">{lead.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                            {cfg.label}
                          </span>
                          <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                            {SOURCE_LABELS[lead.source] || lead.source}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                            <Phone size={13} /> {lead.phone}
                          </a>
                          {lead.interest && (
                            <span className="flex items-center gap-1.5">
                              <Tag size={13} className="text-gold" /> {lead.interest}
                            </span>
                          )}
                          {lead.budget && (
                            <span className="flex items-center gap-1.5">
                              💰 {lead.budget}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 text-white/40">
                            <Calendar size={13} /> {formatDate(lead.createdAt)}
                          </span>
                        </div>
                        {lead.note && (
                          <p className="mt-1.5 text-white/50 text-xs flex items-start gap-1.5">
                            <StickyNote size={12} className="mt-0.5 flex-shrink-0" /> {lead.note}
                          </p>
                        )}
                        {lead.adminNote && !isEditing && (
                          <p className="mt-1.5 text-gold/70 text-xs flex items-start gap-1.5">
                            <User size={12} className="mt-0.5 flex-shrink-0" /> Ghi chú: {lead.adminNote}
                          </p>
                        )}
                      </div>

                      {/* Right: action */}
                      <div className="flex-shrink-0">
                        {!isEditing ? (
                          <button
                            onClick={() => {
                              setEditingId(lead.id);
                              setEditStatus(lead.status as LeadStatus);
                              setEditNote(lead.adminNote || "");
                            }}
                            className="text-xs text-white/50 hover:text-gold border border-white/10 hover:border-gold/40 px-3 py-1.5 rounded-lg transition-all"
                          >
                            Cập nhật
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-xs text-white/50 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => updateLead.mutate({ id: lead.id, status: editStatus, adminNote: editNote })}
                              disabled={updateLead.isPending}
                              className="text-xs btn-gold px-3 py-1.5 rounded-lg disabled:opacity-60"
                            >
                              {updateLead.isPending ? "..." : "Lưu"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Edit panel */}
                    {isEditing && (
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
                        <div>
                          <label className="text-white/50 text-xs mb-1 block">Trạng thái</label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                          >
                            {(Object.entries(STATUS_CONFIG) as [LeadStatus, typeof STATUS_CONFIG[LeadStatus]][]).map(([k, v]) => (
                              <option key={k} value={k} className="bg-navy">{v.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-white/50 text-xs mb-1 block">Ghi chú nội bộ</label>
                          <textarea
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            rows={2}
                            placeholder="Ghi chú về khách hàng này..."
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

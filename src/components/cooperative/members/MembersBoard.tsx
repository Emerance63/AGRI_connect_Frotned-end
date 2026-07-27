"use client";

import { useEffect, useMemo, useState } from "react";
import BroadcastPanel from "./BroadcastPanel";
import MemberCard from "./MemberCard";
import SearchMembers from "./SearchMembers";
import { useCooperativeData, type Member, type MemberStatus } from "@/lib/cooperative-data";
import { useLanguage } from "@/lib/LanguageContext";
import { getToken, apiGetMembers, apiCreateMember } from "@/lib/apiClient";

type Audience = "all" | "active" | "pending" | "inactive";

// ─── Map API member status → local status ────────────────────────────────────
function toLocalStatus(apiStatus: string): MemberStatus {
  switch (apiStatus.toUpperCase()) {
    case "ACTIVE":
      return "Active";
    case "INACTIVE":
      return "Inactive";
    default:
      return "Pending";
  }
}

// ─── Map API member → local Member shape ─────────────────────────────────────
function toLocalMember(apiMember: {
  id: string;
  name: string;
  phoneNumber: string;
  village: string;
  cropType: string;
  status: string;
}): Member {
  const colors = [
    "bg-green-600",
    "bg-emerald-600",
    "bg-lime-600",
    "bg-teal-600",
    "bg-green-700",
    "bg-emerald-700",
    "bg-lime-700",
  ];
  const colorIndex = Math.abs(apiMember.id.charCodeAt(0) ?? 0) % colors.length;
  return {
    id: apiMember.id,
    name: apiMember.name,
    phone: apiMember.phoneNumber,
    village: apiMember.village,
    crop: apiMember.cropType,
    status: toLocalStatus(apiMember.status),
    color: colors[colorIndex],
  };
}

// ─── Add Member Modal ────────────────────────────────────────────────────────
function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: Omit<Member, "id" | "color">) => void;
}) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [crop, setCrop] = useState("");
  const [status, setStatus] = useState<MemberStatus>("Active");

  if (!isOpen) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      village: village.trim(),
      crop: crop.trim(),
      status,
    });
    setName("");
    setPhone("");
    setVillage("");
    setCrop("");
    setStatus("Active");
    onClose();
  }

  const inputCls =
    "w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-member-title"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-[#112d1a]"
      >
        <div className="flex items-center justify-between">
          <h2
            id="add-member-title"
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            {t.members.addModalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.members.placeholderName}
            className={inputCls}
          />
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.members.placeholderPhone}
            className={inputCls}
          />
          <input
            required
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            placeholder={t.members.placeholderVillage}
            className={inputCls}
          />
          <input
            required
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder={t.members.placeholderCrop}
            className={inputCls}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as MemberStatus)}
            className={`${inputCls} dark:bg-[#112d1a]`}
          >
            <option value="Active">{t.members.statusActive}</option>
            <option value="Pending">{t.members.statusPending}</option>
            <option value="Inactive">{t.members.statusInactive}</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium dark:border-white/10 dark:text-white"
          >
            {t.members.addModalCancel}
          </button>
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            {t.members.addModalSave}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main Board ──────────────────────────────────────────────────────────────
export default function MembersBoard() {
  const { t } = useLanguage();
  const { members: localMembers, addMember: addLocalMember } = useCooperativeData();

  // Merged member list — API data takes priority, falls back to localStorage
  const [apiMembers, setApiMembers] = useState<Member[] | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [audience, setAudience] = useState<Audience>("all");
  const [channel, setChannel] = useState<"SMS" | "Voice">("SMS");
  const [message, setMessage] = useState("Muraho banyamuryango,");
  const [notice, setNotice] = useState("");

  // Whichever list is available: API data first, then localStorage
  const membersList = apiMembers ?? localMembers;

  // Fetch members from API on mount when JWT is present
  useEffect(() => {
    if (!getToken()) return;

    let active = true;
    setApiLoading(true);

    apiGetMembers()
      .then((data) => {
        if (!active) return;
        setApiMembers(data.map(toLocalMember));
      })
      .catch(() => {
        // API unavailable — silently fall back to localStorage members
      })
      .finally(() => {
        if (active) setApiLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return !term
      ? membersList
      : membersList.filter((m) =>
          [m.name, m.village, m.crop].some((v) => v.toLowerCase().includes(term))
        );
  }, [membersList, search]);

  const recipients = useMemo(
    () =>
      audience === "all"
        ? membersList
        : membersList.filter((m) => m.status.toLowerCase() === audience),
    [audience, membersList]
  );

  async function handleAddMember(member: Omit<Member, "id" | "color">) {
    // Try real API first when JWT exists
    if (getToken()) {
      try {
        const created = await apiCreateMember({
          name: member.name,
          phoneNumber: member.phone,
          village: member.village,
          cropType: member.crop,
          status: member.status.toUpperCase() as "ACTIVE" | "INACTIVE" | "PENDING",
        });
        setApiMembers((prev) => [...(prev ?? []), toLocalMember(created)]);
        setNotice(`${member.name} ${t.members.memberAdded}`);
        return;
      } catch {
        // Fall through to localStorage fallback
      }
    }

    // localStorage fallback
    addLocalMember(member);
    setNotice(`${member.name} ${t.members.memberAdded}`);
  }

  function handleSendSms(member: Member) {
    setNotice(`${t.members.sendSms} → ${member.name} (${member.phone})`);
  }

  function sendBroadcast() {
    if (!message.trim() || recipients.length === 0) return;
    setNotice(
      `${channel} ${t.members.broadcastSent} ${recipients.length} ${
        recipients.length === 1 ? t.members.broadcastMember : t.members.broadcastMembers
      }.`
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">{t.members.subtitle}</p>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.members.title}</h1>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="w-fit rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        >
          {t.members.addMember}
        </button>
      </div>

      {/* API loading indicator */}
      {apiLoading && (
        <p className="text-xs text-gray-400 dark:text-green-100/40">
          Loading members from server…
        </p>
      )}

      {notice && (
        <p
          role="status"
          className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100"
        >
          {notice}
        </p>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="space-y-4">
          <SearchMembers search={search} onSearchChange={setSearch} />

          {filteredMembers.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} onSendSms={handleSendSms} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:text-green-100/60 dark:ring-white/10">
              {t.members.noMembers}
            </div>
          )}
        </section>

        <BroadcastPanel
          audience={audience}
          audienceCount={recipients.length}
          channel={channel}
          message={message}
          onAudienceChange={setAudience}
          onChannelChange={setChannel}
          onMessageChange={setMessage}
          onSend={sendBroadcast}
        />
      </div>

      <AddMemberModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
}

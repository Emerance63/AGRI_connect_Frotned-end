"use client";

import { useMemo, useState } from "react";
import BroadcastPanel from "./BroadcastPanel";
import MemberCard from "./MemberCard";
import SearchMembers from "./SearchMembers";
import { useCooperativeData, type Member, type MemberStatus } from "@/lib/cooperative-data";

type Audience = "all" | "active" | "pending" | "inactive";

type AddMemberModalProps = { isOpen: boolean; onClose: () => void; onAdd: (member: Omit<Member, "id" | "color">) => void };

function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [crop, setCrop] = useState("");
  const [status, setStatus] = useState<MemberStatus>("Active");

  if (!isOpen) return null;
  function submit(event: React.FormEvent) {
    event.preventDefault();
    onAdd({ name: name.trim(), phone: phone.trim(), village: village.trim(), crop: crop.trim(), status });
    setName(""); setPhone(""); setVillage(""); setCrop(""); setStatus("Active");
    onClose();
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" aria-labelledby="add-member-title"><form onSubmit={submit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-[#112d1a]"><div className="flex items-center justify-between"><h2 id="add-member-title" className="text-lg font-bold text-gray-900 dark:text-white">Add New Member</h2><button type="button" onClick={onClose} aria-label="Close add member dialog" className="text-2xl text-gray-400 hover:text-red-500">×</button></div><div className="mt-5 space-y-4"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Member name" className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white" /><input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number (+250...)" className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white" /><input required value={village} onChange={(event) => setVillage(event.target.value)} placeholder="Village" className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white" /><input required value={crop} onChange={(event) => setCrop(event.target.value)} placeholder="Crop or produce" className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white" /><select value={status} onChange={(event) => setStatus(event.target.value as MemberStatus)} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-[#112d1a] dark:text-white"><option>Active</option><option>Pending</option><option>Inactive</option></select></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium dark:border-white/10">Cancel</button><button type="submit" className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Add Member</button></div></form></div>;
}

export default function MembersBoard() {
  const { members, addMember } = useCooperativeData();
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [audience, setAudience] = useState<Audience>("all");
  const [channel, setChannel] = useState<"SMS" | "Voice">("SMS");
  const [message, setMessage] = useState("Muraho banyamuryango,");
  const [notice, setNotice] = useState("");

  const filteredMembers = useMemo(() => { const term = search.trim().toLowerCase(); return !term ? members : members.filter((member) => [member.name, member.village, member.crop].some((value) => value.toLowerCase().includes(term))); }, [members, search]);
  const recipients = useMemo(() => audience === "all" ? members : members.filter((member) => member.status.toLowerCase() === audience), [audience, members]);

  function handleAddMember(member: Omit<Member, "id" | "color">) {
    addMember(member);
    setNotice(`${member.name} was added as a member.`);
  }

  function sendBroadcast() {
    if (!message.trim() || recipients.length === 0) return;
    setNotice(`${channel} broadcast sent to ${recipients.length} member${recipients.length === 1 ? "" : "s"}.`);
  }

  return <div className="space-y-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-gray-400 dark:text-green-100/50">Manage farmers and broadcast messages — works on basic phones</p><h1 className="text-xl font-bold text-gray-900 dark:text-white">Members &amp; SMS</h1></div><button type="button" onClick={() => setAddOpen(true)} className="w-fit rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600">+ Add Member</button></div>{notice && <p role="status" className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">{notice}</p>}<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]"><section className="space-y-4"><SearchMembers search={search} onSearchChange={setSearch} />{filteredMembers.length ? <div className="grid gap-3 md:grid-cols-2">{filteredMembers.map((member) => <MemberCard key={member.id} member={member} onSendSms={(current) => alert(`SMS sent to ${current.name}`)} />)}</div> : <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:text-green-100/60 dark:ring-white/10">No members match your search.</div>}</section><BroadcastPanel audience={audience} audienceCount={recipients.length} channel={channel} message={message} onAudienceChange={setAudience} onChannelChange={setChannel} onMessageChange={setMessage} onSend={sendBroadcast} /></div><AddMemberModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddMember} /></div>;
}

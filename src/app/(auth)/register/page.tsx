"use client";

import { useState } from "react";
import Link from "next/link";

const locations: Record<string, Record<string, string[]>> = {
  "Kigali City": {
    Gasabo: ["Bumbogo", "Gatsata", "Gikomero", "Gisozi", "Jabana", "Jali", "Kacyiru", "Kimihurura", "Kimironko", "Kinyinya", "Ndera", "Nduba", "Remera", "Rusororo", "Rutunga"],
    Kicukiro: ["Gahanga", "Gatenga", "Gikondo", "Kagarama", "Kanombe", "Kicukiro", "Kigarama", "Masaka", "Niboye", "Nyarugunga"],
    Nyarugenge: ["Gitega", "Kanyinya", "Kigali", "Kimisagara", "Mageregere", "Muhima", "Nyakabanda", "Nyamirambo", "Nyarugenge", "Rwezamenyo"],
  },
  "Eastern Province": {
    Bugesera: ["Gashora", "Juru", "Kamabuye", "Ntarama", "Mareba", "Mayange", "Musenyi", "Mwogo", "Ngeruka", "Nyamata", "Nyarugenge", "Rilima", "Ruhuha", "Rweru", "Shyara"],
    Gatsibo: ["Gasange", "Gatsibo", "Gitoki", "Kabarore", "Kageyo", "Kiramuruzi", "Kiziguro", "Muhura", "Murambi", "Ngarama", "Nyagihanga", "Remera", "Rugarama", "Rwimbogo"],
    Kayonza: ["Gahini", "Kabarondo", "Murama", "Murundi", "Mwiri", "Mukarange", "Ndego", "Nyamirama", "Rukara", "Ruramira", "Rwinkwavu", "Nyabwishongwezi"],
    Kirehe: ["Gahara", "Gatore", "Kigarama", "Kigina", "Kirehe", "Mahama", "Mpanga", "Musaza", "Mushikiri", "Nasho", "Nyamugari", "Nyarubuye"],
    Ngoma: ["Gashanda", "Jarama", "Karembo", "Kazo", "Kibungo", "Mugesera", "Murama", "Mutenderi", "Remera", "Rukira", "Rukumberi", "Rurenge", "Sake", "Zaza"],
    Nyagatare: ["Gatunda", "Karama", "Karangazi", "Katabagemu", "Kiyombe", "Matimba", "Mimuri", "Mukama", "Musheli", "Nyagatare", "Rukomo", "Rwempasha", "Rwimiyaga", "Tabagwe"],
    Rwamagana: ["Fumbwe", "Gahengeri", "Gishali", "Karenge", "Kigabiro", "Muhazi", "Munyaga", "Munyiginya", "Musha", "Muyumbu", "Mwulire", "Nyakariro", "Nzige", "Rubona"],
  },
  "Western Province": {
    Karongi: ["Bwishyura", "Gashari", "Gishyita", "Gitesi", "Murambi", "Mubuga", "Mutuntu", "Rugabano", "Ruganda", "Rubengera", "Rwankuba", "Twumba", "Murundi"],
    Ngororero: ["Bwira", "Gatumba", "Hindiro", "Kabaya", "Kageyo", "Kavumu", "Matyazo", "Muhanda", "Muhororo", "Ndaro", "Ngororero", "Nyange", "Sovu"],
    Nyabihu: ["Bigogwe", "Jenda", "Jomba", "Kabatwa", "Karago", "Kintobo", "Mukamira", "Muringa", "Rambura", "Rugera", "Rurembo", "Shyira"],
    Nyamasheke: ["Bushekeri", "Bushenge", "Cyato", "Gihombo", "Kagano", "Karambi", "Karengera", "Kilimbi", "Kirimbi", "Macuba", "Mahembe", "Nyabitekeri", "Rangiro", "Ruharambuga", "Shangi"],
    Rubavu: ["Bugeshi", "Busasamana", "Cyanzarwe", "Gisenyi", "Kanama", "Kanzenze", "Mudende", "Nyakiriba", "Nyamyumba", "Nyundo", "Rubavu", "Rugerero"],
    Rusizi: ["Bugarama", "Butare", "Bweyeye", "Gashonga", "Giheke", "Gihundwe", "Gikundamvura", "Gitambi", "Kamembe", "Muganza", "Mururu", "Nkanka", "Nkombo", "Nkungu", "Nyakabuye", "Nyakarenzo", "Nzahaha", "Rwimbogo"],
    Rutsiro: ["Boneza", "Gihango", "Kigeyo", "Kivumu", "Manihira", "Mukura", "Murunda", "Musasa", "Mushonyi", "Mushubati", "Nyabirasi", "Ruhango", "Rusebeya"],
  },
  "Northern Province": {
    Burera: ["Bungwe", "Butaro", "Cyanika", "Cyeru", "Gahunga", "Gatebe", "Gitovu", "Kagogo", "Kinoni", "Kinyababa", "Kivuye", "Nemba", "Rugarama", "Rugengabari", "Ruhunde", "Rusarabuye", "Rwerere"],
    Gakenke: ["Busengo", "Coko", "Cyabingo", "Gakenke", "Gashenyi", "Janja", "Kamubuga", "Karambo", "Kivuruga", "Mataba", "Minazi", "Mugunga", "Muhondo", "Muyongwe", "Nemba", "Ruli", "Rusasa", "Rushashi", "Rwamiko"],
    Gicumbi: ["Bukure", "Bwisige", "Byumba", "Cyumba", "Giti", "Kaniga", "Kanzenze", "Kageyo", "Karambo", "Karama", "Kazo", "Kigogo", "Manyagiro", "Miyove", "Mukarange", "Muko", "Mutete", "Nyamiyaga", "Rubaya", "Rukomo", "Rushaki"],
    Musanze: ["Busogo", "Cyuve", "Gacaca", "Gashaki", "Gataraga", "Kimonyi", "Kinigi", "Muhoza", "Musanze", "Nkotsi", "Nyange", "Remera", "Rugarama", "Shingiro"],
    Rulindo: ["Base", "Burega", "Bushoki", "Cyinzuzi", "Cyungo", "Kinihira", "Kisaro", "Masoro", "Mbogo", "Murambi", "Ntarabana", "Rukozo", "Rusiga", "Shyorongi", "Tumba", "Ruli", "Ngoma"],
  },
  "Southern Province": {
    Gisagara: ["Gikonko", "Gishubi", "Kansi", "Kibirizi", "Kibilizi", "Kigembe", "Mamba", "Muganza", "Mugombwa", "Mukindo", "Musha", "Ndora", "Save"],
    Huye: ["Gishamvu", "Huye", "Karama", "Kigoma", "Kinazi", "Maraba", "Mbazi", "Mukura", "Ngoma", "Ruhashya", "Rusatira", "Rwaniro", "Simbi", "Tumba"],
    Kamonyi: ["Gacurabwenge", "Karama", "Kayenzi", "Kayumbu", "Mugina", "Musambira", "Ngamba", "Nyamiyaga", "Nyarubaka", "Rugalika", "Rukoma", "Runda"],
    Muhanga: ["Cyeza", "Kabacuzi", "Kiyumba", "Muhanga", "Mushishiro", "Nyabinoni", "Nyamabuye", "Nyarusange", "Rongi", "Rugendabari", "Shyogwe", "Tambwe"],
    Nyamagabe: ["Buruhukiro", "Busanze", "Gasaka", "Gatare", "Kaduha", "Kamegeri", "Kibirizi", "Kibumbwe", "Kitabi", "Mbazi", "Mugano", "Musange", "Musebeya", "Mushubi", "Nkomane", "Tare", "Uwinkingi"],
    Nyanza: ["Busasamana", "Busoro", "Cyabakamyi", "Kibilizi", "Kigoma", "Mukingo", "Muyira", "Ntyazo", "Nyagisozi", "Rwabicuma"],
    Nyaruguru: ["Busanze", "Cyahinda", "Kibeho", "Kivu", "Mata", "Muganza", "Munini", "Ngera", "Ngoma", "Nyabimata", "Nyagisozi", "Ruramba", "Rusenge", "Ruheru"],
    Ruhango: ["Bweramana", "Byimana", "Kinazi", "Kinihira", "Mbuye", "Mwendo", "Ntongwe", "Ruhango", "Shyogwe"],
  },
};

const provinces = Object.keys(locations) as Array<keyof typeof locations>;

export default function RegisterCooperativePage() {
  const [form, setForm] = useState({
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    cooperativeName: "",
    registrationNumber: "",
    province: "",
    district: "",
    sector: "",
    contactInfo: "",
    description: "",
    agreed: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "province") {
      setForm((prev) => ({ ...prev, province: value, district: "", sector: "" }));
      return;
    }

    if (name === "district") {
      setForm((prev) => ({ ...prev, district: value, sector: "" }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const availableDistricts = form.province
    ? Object.keys(locations[form.province])
    : [];
  const availableSectors = form.province && form.district
    ? locations[form.province][form.district] ?? []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) return;
    console.log(form);
  };

  return (
    <div
      className="min-h-screen bg-[#0d1f14] flex flex-col items-center bg-cover bg-center bg-fixed px-4 py-5 sm:px-6"
      style={{ backgroundImage: "linear-gradient(rgba(6, 23, 13, 0.88), rgba(6, 23, 13, 0.92)), url('/images/products/reg.jpg')" }}
    >
      {/* Card */}
      <div className="w-full max-w-5xl bg-[#0f2417]/95 border border-[#1f3d29] rounded-xl shadow-xl p-4 sm:p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500" />

        <span className="inline-block text-[11px] tracking-wide font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-4">
          COOPERATIVE ACCOUNT
        </span>

        <h1 className="text-2xl font-bold text-white mb-2">
          Register your cooperative
        </h1>
        <p className="text-sm text-emerald-100/60 mb-4">
          Join AgriConnect to list produce, reach buyers across Rwanda, and
          manage orders from one dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">
            {/* LEFT COLUMN - USER INFORMATION */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                User Information
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jean Bosco"
                  className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* National ID */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  National ID
                </label>
                <div>
                  <input
                    name="nationalId"
                    value={form.nationalId}
                    onChange={handleChange}
                    placeholder="e.g. 1234567890123456"
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Phone Number
                </label>
                <div>
                  <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="+250 788 000 000"
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Email Address
                </label>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="cooperative@example.rw"
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Password
                </label>
                <div>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Confirm Password
                </label>
                <div>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - COOPERATIVE INFORMATION */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <div className="w-1 h-5 bg-amber-500 rounded-full" />
                Cooperative Details
              </h3>

              {/* Cooperative Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Cooperative Name
                </label>
                <div>
                  <input
                    name="cooperativeName"
                    value={form.cooperativeName}
                    onChange={handleChange}
                    placeholder="e.g. Musanze Growers Cooperative"
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Registration Number
                </label>
                <div>
                  <input
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. RCA/COOP/2024/..."
                    className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-emerald-100/40 mt-1">
                  As issued by RCA on your cooperative certificate
                </p>
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Province
                </label>
                <div>
                  <select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">Select province</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  District
                </label>
                <div>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    disabled={!form.province}
                    className="w-full appearance-none bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">
                      {form.province ? "Select district" : "Select a province first"}
                    </option>
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Sector
                </label>
                <select
                  name="sector"
                  value={form.sector}
                  onChange={handleChange}
                  disabled={!form.district}
                  className="w-full appearance-none bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {form.district ? "Select sector" : "Select a district first"}
                  </option>
                  {availableSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Contact Info
                </label>
                <input
                  name="contactInfo"
                  value={form.contactInfo}
                  onChange={handleChange}
                  placeholder="Contact person / additional phone"
                  className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description of the cooperative"
              className="w-full bg-[#0d1f14] border border-[#1f3d29] rounded-lg p-3 text-sm text-white placeholder:text-emerald-100/30 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              rows={2}
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-xs text-emerald-100/60 pt-1">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              className="mt-0.5 w-3.5 h-3.5 accent-emerald-500"
            />
            <span>
              I agree to AgriConnect&apos;s{" "}
              <Link href="/terms" className="text-amber-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and confirm this cooperative is registered in Rwanda.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!form.agreed}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg py-3 mt-4 transition"
          >
            Create Cooperative Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-[#1f3d29]" />
            <span className="text-[11px] text-emerald-100/40">OR</span>
            <div className="flex-1 h-px bg-[#1f3d29]" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-emerald-100/60">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-white font-semibold hover:underline"
            >
              Log in to your cooperative
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

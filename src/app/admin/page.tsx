import AdminSidebar from "@/components/admin/Adminsidebar";
import PlatformOverviewBoard from "@/components/admin/PlatformOverviewBoard";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-[#081F14] flex">
            <AdminSidebar />
            <PlatformOverviewBoard />
        </div>
    );
}

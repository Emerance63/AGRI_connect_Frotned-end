import AdminSidebar from "@/components/admin/Adminsidebar";
import ReportsBoard from "@/components/admin/ReportsBoard";

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-black flex">
            <AdminSidebar />
            <ReportsBoard />
        </div>
    );
}
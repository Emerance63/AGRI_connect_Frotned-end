import AdminSidebar from "@/components/admin/Adminsidebar";
import VerificationBoard from "@/components/admin/VerificationBoard";

export default function VerificationPage() {
    return (
        <div className="min-h-screen bg-[#081F14] flex">
            <AdminSidebar />
            <VerificationBoard />
        </div>
    );
}

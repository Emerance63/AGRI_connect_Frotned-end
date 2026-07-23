import AdminSidebar from "@/components/admin/Adminsidebar";
import VerificationBoard from "@/components/admin/VerificationBoard";

export default function VerificationPage() {
    return (
        <div className="min-h-screen bg-black flex">
            <AdminSidebar />
            <VerificationBoard />
        </div>
    );
}
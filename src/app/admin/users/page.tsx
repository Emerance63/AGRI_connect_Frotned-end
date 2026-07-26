import AdminSidebar from "@/components/admin/Adminsidebar";
import UsersBuyersBoard from "@/components/admin/UsersBuyersBoard";

export default function UsersBuyersPage() {
    return (
        <div className="min-h-screen bg-[#081F14] flex">
            <AdminSidebar />
            <UsersBuyersBoard />
        </div>
    );
}

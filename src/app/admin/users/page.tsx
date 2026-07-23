import AdminSidebar from "@/components/admin/Adminsidebar";
import UsersBuyersBoard from "@/components/admin/UsersBuyersBoard";

export default function UsersBuyersPage() {
    return (
        <div className="min-h-screen bg-black flex">
            <AdminSidebar />
            <UsersBuyersBoard />
        </div>
    );
}
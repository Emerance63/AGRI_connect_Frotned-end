import Adminsidebar from "@/components/admin/Adminsidebar";
import SettingsBoard from "@/components/admin/SettingsBoard";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-black flex">
            <Adminsidebar />
            <SettingsBoard />
        </div>
    );
}
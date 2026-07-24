import { Outlet } from "react-router-dom";

import Sidebar from "../components/owner/Sidebar";
import OwnerNavbar from "../components/owner/OwnerNavbar";

function OwnerLayout() {
    return (
        <div className="min-h-screen bg-slate-50">

            <Sidebar />

            <div className="ml-64 min-h-screen flex flex-col">

                <OwnerNavbar />

                <main className="flex-1 p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default OwnerLayout;
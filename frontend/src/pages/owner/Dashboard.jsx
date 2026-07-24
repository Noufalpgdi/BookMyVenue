import {
    Building2,
    CalendarCheck,
    Wallet,
    Star,
} from "lucide-react";

import StatCard from "../../components/owner/dashboard/StatCard";
import WelcomeBanner from "../../components/owner/dashboard/WelcomeBanner";

import RevenueChart from "../../components/owner/dashboard/RevenueChart";
import BookingStatusChart from "../../components/owner/dashboard/BookingStatusChart";

function Dashboard() {
    return (
        <div className="space-y-8 pt-2">

            <WelcomeBanner />

            {/* Stats */}

            <div className="grid grid-cols-4 gap-6">

                <StatCard
                    title="Total Venues"
                    value="12"
                    subtitle="+2 this month"
                    icon={<Building2 size={28} />}
                />

                <StatCard
                    title="Bookings"
                    value="245"
                    subtitle="+18% this month"
                    icon={<CalendarCheck size={28} />}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />

                <StatCard
                    title="Revenue"
                    value="₹1.85L"
                    subtitle="+12% this month"
                    icon={<Wallet size={28} />}
                    iconBg="bg-yellow-100"
                    iconColor="text-yellow-600"
                />

                <StatCard
                    title="Rating"
                    value="4.8"
                    subtitle="Excellent"
                    icon={<Star size={28} />}
                    iconBg="bg-pink-100"
                    iconColor="text-pink-600"
                />

            </div>

            <div className="grid grid-cols-3 gap-6">

                <div className="col-span-2">
                    <RevenueChart />
                </div>

                <BookingStatusChart />

            </div>

        </div>
    );
}

export default Dashboard;
import {
    BadgeCheck,
    Clock3,
    XCircle
} from "lucide-react";

function PaymentStatusCard({ booking }) {

    const paymentStatus = booking.payment.status;

    const statusConfig = {
        SUCCESS: {
            icon: BadgeCheck,
            title: "Payment Successful",
            description: "Your payment has been successfully processed.",
            badge: "bg-green-100 text-green-700",
            iconColor: "text-green-600",
            iconBg: "bg-green-100",
        },

        PENDING: {
            icon: Clock3,
            title: "Payment Pending",
            description: "We're waiting for the payment gateway to confirm your payment.",
            badge: "bg-yellow-100 text-yellow-700",
            iconColor: "text-yellow-600",
            iconBg: "bg-yellow-100",
        },

        FAILED: {
            icon: XCircle,
            title: "Payment Failed",
            description: "Your payment could not be completed. Please try again.",
            badge: "bg-red-100 text-red-700",
            iconColor: "text-red-600",
            iconBg: "bg-red-100",
        },
    };

    const current =
        statusConfig[paymentStatus] || statusConfig.PENDING;

    const Icon = current.icon;

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            {/* Header */}

            <div className="flex items-center gap-2 mb-5">

                <BadgeCheck
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-lg font-semibold">
                    Payment Status
                </h2>

            </div>

            <div className="border-t border-gray-100 mb-5"></div>

            <div className="flex items-center gap-4">

                <div
                    className={`p-3 rounded-full ${current.iconBg} ${current.iconColor}`}
                >
                    <Icon size={24} />
                </div>

                <div className="flex-1">

                    <h3 className="font-semibold text-lg">
                        {current.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                        {current.description}
                    </p>

                    <span
                        className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${current.badge}`}
                    >
                        {paymentStatus.charAt(0) +
                            paymentStatus.slice(1).toLowerCase()}
                    </span>

                </div>

            </div>

        </div>

    );
}

export default PaymentStatusCard;
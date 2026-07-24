import {
    CreditCard,
    Building2,
    CircleDollarSign,
    Receipt,
    CalendarDays
} from "lucide-react";

function PaymentInformation({ booking }) {

    const payment = booking.payment;

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            {/* Header */}

            <div className="flex items-center gap-2 mb-6">

                <CreditCard
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-xl font-semibold">
                    Payment Information
                </h2>

            </div>

            <div className="space-y-5">

                {/* Amount */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <CircleDollarSign size={16} />

                        <span>Amount</span>

                    </div>

                    <span className="font-medium">
                        ₹{Number(payment.amount).toLocaleString("en-IN")}
                    </span>

                </div>

                {/* Currency */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <Receipt size={16} />

                        <span>Currency</span>

                    </div>

                    <span className="font-medium">
                        {payment.currency}
                    </span>

                </div>

                {/* Provider */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <Building2 size={16} />

                        <span>Payment Provider</span>

                    </div>

                    <span className="font-medium">
                        {payment.provider.charAt(0) + payment.provider.slice(1).toLowerCase()}
                    </span>

                </div>

                {/* Transaction ID */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <Receipt size={16} />

                        <span>Transaction ID</span>

                    </div>

                    <span className="font-medium">
                        {payment.transactionId ?? "Not Available"}
                    </span>

                </div>

                {/* Payment Created */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-500">

                        <CalendarDays size={16} />

                        <span>Payment Created</span>

                    </div>

                    <span className="font-medium">

                        {new Date(payment.createdAt)
                        .toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })
                        .toUpperCase()}

                    </span>

                </div>

            </div>

        </div>

    );
}

export default PaymentInformation;
import {
    LifeBuoy,
    Mail,
    Phone
} from "lucide-react";

function NeedHelpCard() {

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            {/* Header */}

            <div className="flex items-center gap-2 mb-5">

                <LifeBuoy
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-lg font-semibold">
                    Need Help?
                </h2>

            </div>

            <div className="border-t border-gray-100 mb-5"></div>

            <p className="text-sm text-gray-500 leading-6">
                If you have any questions regarding your booking or payment,
                our support team is happy to help.
            </p>

            <div className="mt-6 space-y-3">

                <a
                    href="mailto:support@bookmyvenue.com"
                    className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-600 rounded-lg py-2.5 font-medium hover:bg-blue-50 transition"
                >
                    <Mail size={18} />
                    support@bookmyvenue.com
                </a>

                <a
                    href="tel:+919847405796"
                    className="w-full flex items-center justify-center gap-2 border border-green-500 text-green-600 rounded-lg py-2.5 font-medium hover:bg-green-50 transition"
                >
                    <Phone size={18} />
                    +91 98474 05796
                </a>

            </div>

        </div>

    );
}

export default NeedHelpCard;
function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconBg = "bg-blue-100",
    iconColor = "text-blue-600",
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 transition">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                        {value}
                    </h2>

                    <p className="text-sm text-green-600 mt-3">
                        {subtitle}
                    </p>

                </div>

                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
                >
                    <div className={iconColor}>
                        {icon}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default StatCard;
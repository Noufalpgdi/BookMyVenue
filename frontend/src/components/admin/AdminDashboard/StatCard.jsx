import "./Dashboard.css";

function StatCard({
    title,
    value,
    icon,
    color = "#2563eb",
    subtitle = ""
}) {
    return (
        <div className="stat-card">
            <div className="stat-card-top">
                <div
                    className="stat-card-icon"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>

                <div>
                    <h4>{title}</h4>
                    {subtitle && <p>{subtitle}</p>}
                </div>
            </div>

            <h2>{value}</h2>
        </div>
    );
}

export default StatCard;
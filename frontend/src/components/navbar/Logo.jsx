import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={28} />
            <span className="text-2xl font-bold text-blue-600">
                BookMyVenue
            </span>
        </Link>
    );
}

export default Logo;
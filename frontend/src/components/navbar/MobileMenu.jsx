import { Menu } from "lucide-react";

function MobileMenu() {
    return (
        <button className="md:hidden">
            <Menu size={28} />
        </button>
    );
}

export default MobileMenu;
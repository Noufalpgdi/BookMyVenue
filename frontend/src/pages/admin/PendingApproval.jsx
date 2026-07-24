import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PendingApprovalTable from "../../components/admin/PendingApprovalTable";

import {
    getAllPendingApprovalVenues,
    approveVenue,
    rejectVenue
} from "../../api/venueApi";

function PendingApproval() {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPendingVenues = async () => {

        try {

            setLoading(true);

            const response = await getAllPendingApprovalVenues();

            setVenues(response.venues);

        }
        catch (error) {

            console.error("Failed to load pending venues:", error);

            toast.error("Failed to load pending venues.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleApprove = async (venueId) => {

        try {

            await approveVenue(venueId);

            // Remove approved venue from the table
            setVenues((prev) =>
                prev.filter((venue) => venue.id !== venueId)
            );

            toast.success("Venue approved successfully!");

        }
        catch (error) {

            console.error("Failed to approve venue:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to approve venue."
            );

        }

    };

    const handleReject = async (venueId) => {

        try {

            await rejectVenue(venueId);

            // Remove rejected venue from the table
            setVenues((prev) =>
                prev.filter((venue) => venue.id !== venueId)
            );

            toast.success("Venue rejected successfully!");

        }
        catch (error) {

            console.error("Failed to reject venue:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to reject venue."
            );

        }

    };

    useEffect(() => {

        loadPendingVenues();

    }, []);

    return (

        <PendingApprovalTable
            venues={venues}
            loading={loading}
            onApprove={handleApprove}
            onReject={handleReject}
        />

    );

}

export default PendingApproval;
function PendingApprovalTable({

    venues,
    loading,
    onApprove,
    onReject

}) {

    if (loading) {

        return (

            <div className="flex justify-center items-center py-20">

                <p className="text-lg text-gray-600">
                    Loading pending venues...
                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold text-gray-800">

                    Pending Venue Approvals

                </h2>

                <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">

                    {venues.length} Pending

                </span>

            </div>

            {

                venues.length === 0 ? (

                    <div className="text-center py-12 text-gray-500">

                        No pending venues found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-200">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Venue
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Owner
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        City
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Type
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Capacity
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Price / Hour
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                        Submitted
                                    </th>

                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">

                                {

                                    venues.map((venue) => (

                                        <tr
                                            key={venue.id}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {venue.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {venue.owner.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {venue.city}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {venue.venueType}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {venue.capacity}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                ₹{venue.pricePerHour}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(
                                                    venue.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() => onApprove(venue.id)}
                                                        className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() => onReject(venue.id)}
                                                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                                    >
                                                        Reject
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    );

}

export default PendingApprovalTable;
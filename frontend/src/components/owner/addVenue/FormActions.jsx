import { useNavigate } from "react-router-dom";

function FormActions({
    loading,
    onSubmit,
    buttonText = "Create Venue"
}) {

    const navigate = useNavigate();

    return (

        <div className="flex justify-end gap-4">

            <button
                type="button"
                onClick={() => navigate("/owner/venues")}
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
                Cancel
            </button>

            <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
                {loading ? "Saving..." : buttonText}
            </button>

        </div>

    );

}

export default FormActions;
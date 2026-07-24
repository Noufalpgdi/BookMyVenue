import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import BasicInfoSection from "../../components/owner/addVenue/BasicInfoSection";
import LocationSection from "../../components/owner/addVenue/LocationSection";
import PricingSection from "../../components/owner/addVenue/PricingSection";
import AmenitiesSection from "../../components/owner/addVenue/AmenitiesSection";
import ImageUploadSection from "../../components/owner/addVenue/ImageUploadSection";
import FormActions from "../../components/owner/addVenue/FormActions";

import {
    createVenue,
    getVenueTypes
} from "../../api/venueApi";

function AddVenue() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [loadingVenueTypes, setLoadingVenueTypes] = useState(true);

    const [venueTypes, setVenueTypes] = useState([]);

    const [formData, setFormData] = useState({

        name: "",
        description: "",
        venueType: "",

        address: "",
        city: "",
        district: "",
        state: "",

        latitude: "",
        longitude: "",

        capacity: "",
        pricePerHour: "",

        amenities: [],

        images: []

    });

    useEffect(() => {

        loadVenueTypes();

    }, []);

    const loadVenueTypes = async () => {

        try {

            const response = await getVenueTypes();

            setVenueTypes(response.data);

        } catch (error) {

            console.error("Failed to load venue types:", error);

        } finally {

            setLoadingVenueTypes(false);

        }

    };

    const validateForm = () => {

        if (!formData.name.trim()) {
            return "Venue name is required.";
        }

        if (!formData.venueType) {
            return "Please select a venue type.";
        }

        if (!formData.description.trim()) {
            return "Description is required.";
        }

        if (!formData.address.trim()) {
            return "Address is required.";
        }

        if (!formData.city.trim()) {
            return "City is required.";
        }

        if (!formData.district.trim()) {
            return "District is required.";
        }

        if (!formData.state.trim()) {
            return "State is required.";
        }

        if (!formData.capacity || Number(formData.capacity) <= 0) {
            return "Capacity must be greater than zero.";
        }

        if (!formData.pricePerHour || Number(formData.pricePerHour) <= 0) {
            return "Price per hour must be greater than zero.";
        }

        if (
            (formData.latitude && !formData.longitude) ||
            (!formData.latitude && formData.longitude)
        ) {
            return "Latitude and Longitude must both be provided.";
        }

        if (formData.amenities.length === 0) {
            return "Please select at least one amenity.";
        }

        if (formData.images.length === 0) {
            return "Please upload at least one image.";
        }

        return null;

    };

    const handleSubmit = async () => {

        const validationError = validateForm();

        if (validationError) {

            alert(validationError);
            return;

        }

        try {

            setLoading(true);

            const response = await createVenue(formData);

            console.log("Venue Created Successfully:", response);

            alert("Venue created successfully.");

            navigate("/owner/venues");

        } catch (error) {

            console.error("Create Venue Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to create venue."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loadingVenueTypes) {

        return (

            <div className="flex items-center justify-center h-[70vh]">

                <div className="text-lg font-medium text-gray-600">
                    Loading venue types...
                </div>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto">

            {/* Back Button */}

            <Link
                to="/owner/venues"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
                <ArrowLeft size={18} />
                <span>Back to My Venues</span>
            </Link>

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-900">
                    Add New Venue
                </h1>

                <p className="text-gray-500 mt-2">
                    Create a new venue listing.
                </p>

            </div>

            {/* Form */}

            <div className="space-y-6">

                <BasicInfoSection
                    formData={formData}
                    setFormData={setFormData}
                    venueTypes={venueTypes}
                    loadingVenueTypes={loadingVenueTypes}
                />

                <LocationSection
                    formData={formData}
                    setFormData={setFormData}
                />

                <PricingSection
                    formData={formData}
                    setFormData={setFormData}
                />

                <AmenitiesSection
                    formData={formData}
                    setFormData={setFormData}
                />

                <ImageUploadSection
                    formData={formData}
                    setFormData={setFormData}
                />

                <FormActions
                    loading={loading}
                    onSubmit={handleSubmit}
                    buttonText="Create Venue"
                />

            </div>

        </div>

    );

}

export default AddVenue;
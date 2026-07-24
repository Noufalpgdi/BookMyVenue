import { ImagePlus, Trash2 } from "lucide-react";
import { useEffect } from "react";

function ImageUploadSection({ formData, setFormData }) {

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        if (files.length === 0) return;

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));

        // Allows selecting the same file again after removing it
        e.target.value = "";

    };

    const removeImage = (index) => {

    const image = formData.images[index];

        // Revoke only if it's a newly uploaded image
        if (image.file && image.preview) {
            URL.revokeObjectURL(image.preview);
        }

        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));

    };

    // Cleanup all preview URLs when component unmounts
    useEffect(() => {

        return () => {

            formData.images.forEach(image => {

                if (image.file && image.preview) {
                    URL.revokeObjectURL(image.preview);
                }

            });

        };

    }, [formData.images]);

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-8">

                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">

                    <ImagePlus
                        size={20}
                        className="text-pink-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Venue Images
                    </h2>

                    <p className="text-sm text-gray-500">
                        Upload high-quality images of your venue.
                    </p>

                </div>

            </div>

            {/* Upload Box */}

            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">

                <ImagePlus
                    size={40}
                    className="text-blue-500 mb-3"
                />

                <p className="font-semibold text-gray-700">
                    Click to upload images
                </p>

                <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG or JPEG
                </p>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                />

            </label>

            {/* Preview */}

            {formData.images.length > 0 && (

                <div className="mt-8">

                    <h3 className="font-semibold text-gray-800 mb-4">
                        Selected Images ({formData.images.length})
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                        {formData.images.map((image, index) => (

                            <div
                                key={index}
                                className="relative group"
                            >

                                <img
                                    src={image.preview || image.imageUrl}
                                    alt={`Venue Preview ${index + 1}`}
                                    className="w-full h-36 object-cover rounded-xl border"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                                >

                                    <Trash2 size={16} />

                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>

    );

}

export default ImageUploadSection;
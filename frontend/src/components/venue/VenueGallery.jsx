function VenueGallery({venue}) {
    const galleryImages = venue.images?.slice(0, 5) ?? [];
    if (galleryImages.length === 0) {
        return (
            <div className="h-80 lg:h-96 flex items-center justify-center bg-gray-100 rounded-xl">
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }
    if (galleryImages.length === 1) 
    {
        return (
            <img
                src={galleryImages[0].imageUrl}
                alt={venue.name}
                className="w-full h-80 lg:h-96 object-cover rounded-xl"
            />
        );
    }
    const thumbnailImages = galleryImages.slice(1);
    const thumbnailGridClass =
    thumbnailImages.length === 1
        ? "grid grid-rows-1 gap-2"
        : thumbnailImages.length === 2
        ? "grid grid-rows-2 gap-2"
        : thumbnailImages.length === 3
        ? "grid grid-rows-3 gap-2"
        : "grid grid-rows-4 gap-2";
    const totalImages = venue.images?.length ?? 0;
    const remainingImages = totalImages - galleryImages.length;
    return (
        <div className="grid grid-cols-3 gap-2 h-80 lg:h-96">
            <div className="col-span-2">
                <img
                    src={galleryImages[0].imageUrl}
                    alt={venue.name}
                    className="w-full h-full object-cover rounded-l-xl"
                />
            </div>
            <div className={thumbnailGridClass}>
                {thumbnailImages.map((image, index) => (
                    <div key={image.imageUrl} className="relative">
                        <img
                            src={image.imageUrl}
                            alt={`${venue.name} ${index + 2}`}
                            className={`w-full h-full object-cover
                                ${index === 0 ? "rounded-tr-xl" : ""}
                                ${index === thumbnailImages.length - 1 ? "rounded-br-xl" : ""}
                            `}
                        />
                        {index === thumbnailImages.length - 1 && totalImages > 5 && (
                            <div className="absolute inset-0 bg-black/50 rounded-br-xl flex items-center justify-center">
                                <div className="text-center text-white">
                                    <p className="text-2xl font-bold">
                                        +{remainingImages }
                                    </p>
                                    <p className="text-sm">
                                        More Photos
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VenueGallery;
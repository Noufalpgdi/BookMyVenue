export const formatVenueType = (venueType) => {
    return venueType
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
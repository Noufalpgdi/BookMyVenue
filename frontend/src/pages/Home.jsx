import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FeaturedVenues from "../components/FeaturedVenues";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
    const [filters, setFilters] = useState({
        city: "",
        capacity: ""
    });
    const [searchFilters, setSearchFilters] = useState({
        city: "",
        capacity: ""
    });
    const handleSearch = () => {

        setSearchFilters(filters);

    };
    return (
        <>
            <Navbar />

            <HeroSection />

            <SearchBar
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
            />

            <FeaturedVenues
                filters={searchFilters}
            />

            <WhyChooseUs />

            <Footer />
        </>
    );
}

export default Home;
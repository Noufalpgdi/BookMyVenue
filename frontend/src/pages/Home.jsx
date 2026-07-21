import {useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import FeaturedVenues from "../components/FeaturedVenues";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";
import { getFilters } from "../api/venueApi";

function Home() {
    const [filters, setFilters] = useState({
        name: "",
        state: "",
        city: "",
        venueType: "",
        capacity: ""
    });

    const [searchFilters, setSearchFilters] = useState({
        name: "",
        state: "",
        city: "",
        venueType: "",
        capacity: ""
    });
    const [filterOptions, setFilterOptions] = useState({
        states: [],
        venueTypes: []
    });
    const handleSearch = () => {

        setSearchFilters(filters);

    };
    const loadFilters = async () => {
        try 
        {
            const result = await getFilters();
            setFilterOptions(result.filters);
        }
        catch (error) 
        {
            console.error("Failed to load filters:", error);
        }
    };
    useEffect(() => {
        loadFilters();
    }, []);

    return (
        <>
            <Navbar />

            <HeroSection />

            <SearchBar
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
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
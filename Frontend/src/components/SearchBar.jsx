import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import { FaSearch, FaTimes } from "react-icons/fa"; // Icons for search and clear

const SearchBar = ({ placeholder, onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobTitles = [
    'site director knowledg univers',
    'administr assist officeteam',
    'account manag chi payment system',
    'outsid wholesal sale rep parttim river front chrysler jeep dodg',
    'custom servic rep help peopl hear loss captioncal',
    'bookkeep accountemp',
    'nuclear medicin tech prn hcaeast florida',
    'construct project admin need asap officeteam',
    'account clerk accountemp',
    'cashier murphi usa',
    'caregiv home health aid cna home instead senior care',
    'oto sale advisor 224 twinsburg club demonstr servic',
    'behavior health nurs bhn mission healthcar servic inc',
    'recent gradsaccount financ accountemp',
    'custom servic repres sale experi prefer officeteam',
    'market sale repres weed man usa franchis',
    'staff account emerg softwar compani accountemp',
    'warehous stocker restaur depot',
    'automot titl support clerk part time jack cooper transport',
    'lpn oakview rehab nurs center',
    'oto culinari ambassador 39 washington club demonstr servic',
    'lm administr officeteam',
    'assist district manag gannett co inc',
    'offic assist officeteam',
    'pharmacist clinic specialist ltc parttim day shift flexibl hr swedish health',
    'data entri clerk officeteam',
    'sale repres sale associ entri level vector market',
    'receptionist healthcar compani n houston officeteam',
    'snack bar attend american golf corpor',
    'unarm secur offic us secur associ',
    'line cook crown plaza independ own oper',
    'kitchen manag job detail artesian hotel casino tradit spirit'
  ];

  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    // Filter job titles based on input
    if (searchValue) {
      const filtered = jobTitles.filter((title) =>
        title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    setFilteredOptions([]);
    setError("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true); // Set loading state
      setError(""); // Reset error state
      try {
        // Send the search query to the backend
        const response = await axios.post("https://mnp-3.vercel.app/recommend", {
          title: query,
        });

        // Process the response
        if (response.data.status === "success") {
          onSearchResults(response.data.recommendations);
        } else {
          onSearchResults([]);
          setError("No recommendations found.");
        }
      } catch (error) {
        console.error("Error fetching job recommendations:", error);
        onSearchResults([]);
        setError("Error fetching recommendations.");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleFocus = () => {
    // Show all job titles when input is focused
    setFilteredOptions(jobTitles);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus} // Add focus handler
          placeholder={placeholder || "Search for jobs..."}
          className="w-full py-3 px-5 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 transform hover:scale-105 focus:shadow-lg"
        />
        <button
          type="submit"
          className="h-10 absolute top-1 right-3 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
          disabled={loading} // Disable while loading
        >
          {loading ? "Searching..." : <FaSearch />}
        </button>
      </form>

      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}

      {filteredOptions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-auto transition-opacity duration-300 ease-in-out opacity-100">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-indigo-100"
              onClick={() => {
                setQuery(option); // Set query to the selected option
                setFilteredOptions([]); // Clear suggestions after selection
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "../components/SearchBar"; // Import the modified SearchBar
import Recommendations from "@/components/Recommendations"; // Assuming JobBox and Recommendations are similar

const Jobs = () => {
  const [searchedJobs, setSearchedJobs] = useState([]); // Store job recommendations
  const [error, setError] = useState(""); // Error state to handle search issues

  // This function will receive search results (job recommendations) from SearchBar
  const handleSearchResults = (recommendations) => {
    console.log("hereeee", recommendations);
    if (recommendations.length === 0) {
      setError("No job recommendations found.");
      setSearchedJobs([]);
    } else {
      setError(""); // Clear error if there are recommendations
      console.log("ddddd", recommendations);
      setSearchedJobs(recommendations);
    }
  };

  useEffect(() => {
    console.log("Updated searchedJobs:", searchedJobs);
  }, [searchedJobs]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-8">Job Search</h1>

      {/* Pass the handleSearchResults function to SearchBar */}
      <SearchBar
        placeholder="Search for jobs..."
        onSearchResults={handleSearchResults}
      />

      {/* Displaying error if any */}
      {error && <div className="mt-4 text-center text-red-500">{error}</div>}

      {/* Displaying the list of searched jobs */}
      {searchedJobs.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Job Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedJobs.map((job, index) => (
              <Recommendations
                key={index}
                jobTitle={job.Title} // Map jobTitle from backend response
                position={job.Position} // Map position from backend response
                company={job.Company} // Map company from backend response
                jobDescription={job.JobDescription} // Map jobDescription from backend response
                status={job.Status} // Map status (Open/Closed) from backend response
              />
            ))}
          </div>
        </div>
      ) : (
        !error && (
          <div className="mt-4 text-center text-gray-500">
            Search for a job to get recommendations!
          </div>
        )
      )}
    </div>
  );
};

export default Jobs;

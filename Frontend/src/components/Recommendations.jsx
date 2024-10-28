import React, { useState } from "react";

const Recommendations = ({ jobTitle, position, company, jobDescription, status }) => {
  // State to manage the visibility of the job description
  const [showDescription, setShowDescription] = useState(false);

  // Function to toggle the job description visibility
  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="mb-2">
        <h3 className="text-2xl font-semibold text-indigo-600">{jobTitle}</h3>
      </div>

      <div className="mb-2">
        <strong className="text-gray-700">Position:</strong>{" "}
        <span className="text-gray-800">{position}</span>
      </div>

      <div className="mb-2">
        <strong className="text-gray-700">Company:</strong>{" "}
        <span className="text-gray-800">{company}</span>
      </div>

      {/* Toggle button for job description */}
      <button
        onClick={toggleDescription}
        className="text-indigo-600 hover:underline mb-2"
      >
        {showDescription ? "Hide Job Description" : "Show Job Description"}
      </button>

      {/* Job description that shows/hides based on state */}
      {showDescription && (
        <div className="mb-4">
          <strong className="text-gray-700">Job Description:</strong>{" "}
          <p className="text-gray-600 mt-1">{jobDescription}</p>
        </div>
      )}

      <div>
        <strong className="text-gray-700">Status:</strong>{" "}
        <span
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            status === "open"
              ? "bg-green-500"
              : status === "closed"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default Recommendations;

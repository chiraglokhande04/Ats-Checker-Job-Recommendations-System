import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setIsFilePicked(true);
      setError(null);
    } else {
      setError("Please select a valid file (PDF or DOCX).");
      setIsFilePicked(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze_resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      onUploadSuccess(response.data);
      setSuccessMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full transition-transform transform hover:scale-105 duration-500 mt-12">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 animate-pulse">
          Upload Your Resume
        </h1>

        <div className="relative overflow-hidden w-full mb-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none transition duration-300 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {isFilePicked && (
          <div className="mt-4 text-center animate-fadeIn">
            <p className="text-gray-700 text-lg">
              <strong>File Name:</strong> {file.name}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>File Size:</strong> {Math.round(file.size / 1024)} KB
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-lg text-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 text-green-500 text-lg text-center">
            {successMessage}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;

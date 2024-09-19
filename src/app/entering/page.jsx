"use client";
import { useState } from "react";
import Modal from "@/app/components/Modal"; // Import the modal component

export default function EnteringPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [enterTime, setEnterTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // Image URL for preview
  const [error, setError] = useState(""); // Error handling
  const [loading, setLoading] = useState(false);

  // Handle file upload and OCR processing with Google Vision API
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Store the uploaded image URL to display it
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl); // Store the image URL

      // Create form data to send the image to the Google Vision API endpoint
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true); // Show loading indicator
      try {
        const res = await fetch("/api/ocr", {
          method: "POST",
          body: formData,
        });
        setLoading(false); // Hide loading indicator
        if (!res.ok) {
          throw new Error("Failed to process the image.");
        }

        const { licensePlate: extractedPlate } = await res.json();

        if (extractedPlate) {
          setLicensePlate(extractedPlate);

          // Get current time for entering timestamp
          const currentTime = new Date().toLocaleString();
          setEnterTime(currentTime);
          // Save the data to the DB
          saveToDB(extractedPlate, currentTime);
        } else {
          setError("No license plate found in the image.");
        }
      } catch (error) {
        setError(`Error with OCR process: ${error.message}`);
        console.error("Error with OCR process:", error);
      }
    }
  };

  // Function to save the data to the database
  const saveToDB = async (plate, time) => {
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plate,
          entered_at: time,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setShowModal(true); // Show modal with the ticket
        setError(""); // Clear any previous error
      } else {
        setError("Failed to save vehicle entry to the database.");
        console.error("Failed to save vehicle entry:", result.error);
      }
    } catch (error) {
      setError(`Error saving vehicle entry to DB: ${error.message}`);
      console.error("Error saving vehicle entry to DB:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Car Entering</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {/* Display the uploaded image */}
      {loading && <p>Processing image...</p>}
      {uploadedImageUrl && (
        <div className="mt-5">
          <img
            src={uploadedImageUrl}
            alt="Uploaded vehicle"
            className="w-64 h-64 object-contain border"
          />
        </div>
      )}
      {licensePlate && <p>Detected License Plate: {licensePlate}</p>}

      {/* Show any error message */}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {showModal && (
        <Modal
          licensePlate={licensePlate}
          enterTime={enterTime}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

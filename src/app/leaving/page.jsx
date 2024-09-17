"use client";
import { useState } from "react";
import Modal from "../components/Modal"; // Assuming a reusable Modal component
import Image from "next/image";

export default function LeavingPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (e) => {
    const saveToDB = async (plate, time) => {
      try {
        const res = await fetch("/api/leaving", {
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
          setTicketData({
            plate: result.vehicle.plate, // Use the data from the result
            entered_at: result.vehicle.entered_at,
            leaving_at: result.vehicle.leaving_at,
            total_time: result.duration,
            fare: result.fare,
          });
          setError(""); // Clear any previous error
        } else {
          setError("Failed to save vehicle entry to the database.");
          console.error("Failed to save vehicle entry:", result.error);
        }
      } catch (error) {
        setError(`Error saving vehicle entry to DB: ${error.message}`);
        console.error("Error saving vehicle entry to DB:", error);
        setLoading(false);
      }
    };

    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setError("");
      setLoading(true);

      // Prepare the form data to send to the API route
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true); // Show loading indicator
      try {
        const res = await fetch("/api/ocr", {
          method: "POST",
          body: formData,
        });
        setLoading(false);
        if (!res.ok) {
          throw new Error("Failed to process the image.");
        }

        const { licensePlate: extractedPlate } = await res.json();

        if (extractedPlate) {
          setLicensePlate(extractedPlate);

          // Get current time for entering timestamp
          const currentTime = new Date().toLocaleString();
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Car Leaving</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {/* Display Uploaded Image */}
      {imageUrl && (
        <div className="mb-5">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={300}
            height={200}
            className="object-contain"
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Ticket Modal */}
      {ticketData && (
        <Modal
          title="Parking Ticket"
          licensePlate={ticketData.plate}
          enterTime={ticketData.entered_at}
          leaveTime={ticketData.leaving_at}
          parkingDuration={ticketData.total_time}
          fare={ticketData.fare}
          onClose={() => setTicketData(null)}
          isOpen={!!ticketData}
        ></Modal>
      )}

      {/* Loading Spinner */}
      {loading && <p>Processing the image...</p>}
      {licensePlate && <p>Detected License Plate: {licensePlate}</p>}
    </div>
  );
}

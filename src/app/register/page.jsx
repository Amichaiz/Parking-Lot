"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("regular");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!plate) {
      setError("Please enter a license plate.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plate,
          type,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setPlate(""); // Clear the form after successful submission
        setType("regular");
      } else {
        setError("Failed to register the vehicle. Please try again.");
      }
    } catch (error) {
      setError("Error registering the vehicle. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Register Vehicle</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        {/* License Plate Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="plate"
          >
            License Plate
          </label>
          <input
            type="text"
            id="plate"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter License Plate"
          />
        </div>

        {/* Vehicle Type Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Vehicle Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="regular">Regular</option>
            <option value="local">Local</option>
            <option value="handicap">Handicap</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Register
        </button>

        {/* Success or Error Message */}
        {success && (
          <p className="text-green-500 text-center mt-4">
            Vehicle registered successfully!
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}

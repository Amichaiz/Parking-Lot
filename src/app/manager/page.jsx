"use client";
import { useState, useEffect } from "react";

export default function ManagerPage() {
  const [carsInside, setCarsInside] = useState([]);
  const [registeredCars, setRegisteredCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cars currently inside
    async function fetchCarsInside() {
      try {
        const res = await fetch("/api/cars-inside", {
          method: "POST", // Change to POST to match the API route
        });
        const data = await res.json();
        if (res.ok) {
          setCarsInside(data.carsInside);
        } else {
          setError("Failed to fetch cars inside.");
        }
      } catch (error) {
        setError("Error fetching cars inside.");
      }
    }

    // Fetch registered cars
    async function fetchRegisteredCars() {
      try {
        const res = await fetch("/api/registered-cars");
        const data = await res.json();
        if (res.ok) {
          setRegisteredCars(data.registeredCars);
        } else {
          setError("Failed to fetch registered cars.");
        }
      } catch (error) {
        setError("Error fetching registered cars.");
      }
    }

    fetchCarsInside();
    fetchRegisteredCars();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Manager Dashboard</h1>

      {error && <p className="text-red-500 mb-5">{error}</p>}

      {/* Cars Currently Inside */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-3">Cars Currently Inside</h2>
        <ul>
          {carsInside.length > 0 ? (
            carsInside.map((car) => (
              <li key={car.plate} className="border-b py-2">
                {car.plate} (Entered at:{" "}
                {new Date(car.entered_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </li>
            ))
          ) : (
            <p>No cars inside the parking lot.</p>
          )}
        </ul>
      </div>

      {/* All Registered Cars */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mt-5">
        <h2 className="text-lg font-semibold mb-3">All Registered Cars</h2>
        <ul>
          {registeredCars.length > 0 ? (
            registeredCars.map((car) => (
              <li key={car.plate} className="border-b py-2">
                {car.plate} (Type: {car.type})
              </li>
            ))
          ) : (
            <p>No registered cars.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

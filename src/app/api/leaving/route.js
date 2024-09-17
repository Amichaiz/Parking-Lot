import { NextResponse } from "next/server";
import pool from "@/utils/neondb"; // Import Neon DB connection

export async function POST(req) {
    const { plate, entered_at } = await req.json();

    try {
        const client = await pool.connect();

        // Join with registered table to find customer type
        const findCarQuery = `
          SELECT v.*, r.type AS customer_type 
          FROM vehicles v
          LEFT JOIN registered r ON v.plate = r.plate
          WHERE v.plate = $1 AND v.leaving_at IS NULL
          ORDER BY v.entered_at ASC
          LIMIT 1;
        `;
        const findCarValues = [plate];
        const carResult = await client.query(findCarQuery, findCarValues);
        if (carResult.rows.length === 0) {
            client.release();
            return NextResponse.json(
                { success: false, message: "No active parking session found for this car." },
                { status: 404 }
            );
        }
        const car = carResult.rows[0];

        // Update the vehicle record with the leave time
        const updateCarQuery = `
          UPDATE vehicles
          SET leaving_at = $1
          WHERE id = $2
          RETURNING *;
        `;
        const updateCarValues = [entered_at, car.id];
        const updatedCarResult = await client.query(updateCarQuery, updateCarValues);
        const updatedCar = updatedCarResult.rows[0];

        // Calculate the parking duration (in minutes)
        const enterTime = new Date(updatedCar.entered_at);
        const exitTime = new Date(updatedCar.leaving_at);
        const parkingDurationInMinutes = Math.floor((exitTime - enterTime) / 1000 / 60);

        // Calculate the fare based on the customer type and parking duration
        const fare = calculateFare(parkingDurationInMinutes, car.customer_type);
        client.release();
        console.log(fare)
        return NextResponse.json({
            success: true,
            vehicle: updatedCar,
            duration: parkingDurationInMinutes,
            fare: fare,
        });
    } catch (error) {
        console.error("Error updating vehicle leave time:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Helper function to calculate the fare
function calculateFare(duration, customerType) {
    const first15Free = 15; // First 15 minutes are free
    const upToOneHour = 60; // One hour mark

    if (duration <= first15Free) {
        return 0;
    }

    let fare = 0;

    if (customerType === "regular") {
        return fare; // Regular customers park for free
    } else if (customerType === "handicap") {
        duration -= first15Free;
        fare = Math.ceil(duration / 15) * 1.50; // $1.50 every 15 minutes
    } else if (customerType === "local") {
        duration -= first15Free;
        fare = Math.ceil(duration / 15) * 2.50; // $2.50 every 15 minutes
    } else {
        // Default case for non-local, non-regular, non-handicap customers
        if (duration <= upToOneHour) {
            fare = 10; // $10 for up to 1 hour
        } else {
            fare = 10 + Math.ceil((duration - upToOneHour) / 15) * 2.50; // $2.50 every additional 15 minutes
        }
    }

    return fare;
}

// app/api/ocr/route.js
import { detectLicensePlate } from "@/utils/googleVision";
import { NextResponse } from "next/server";

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");

    // Convert the uploaded image to a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    try {
        const licensePlateText = await detectLicensePlate(fileBuffer);
        return NextResponse.json({ licensePlate: licensePlateText });
    } catch (error) {
        console.error("Error detecting license plate:", error);
        return NextResponse.json({ error: "Failed to process the image" }, { status: 500 });
    }
}

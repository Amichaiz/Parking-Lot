// utils/googleVision.js
const vision = require('@google-cloud/vision');
const fs = require('fs');
const path = require('path');
const tempFilePath = path.join(process.cwd(), 'temp_secret.json');

fs.writeFileSync(tempFilePath, process.env.JSON_SECRET);


// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: tempFilePath, // Use the temp file path
});

async function detectLicensePlate(fileBuffer) {
    const [result] = await client.textDetection(fileBuffer);
    const detections = result.textAnnotations;

    if (detections.length > 0) {
        // Get the first detection and apply regex to filter only letters and numbers
        const rawText = detections[0].description.trim();

        // Regular expression to match only alphanumeric characters (ignores special chars, spaces, etc.)
        const licensePlateText = rawText.replace(/[^a-zA-Z0-9]/g, '');

        return licensePlateText;
    }
    return null;
}

module.exports = { detectLicensePlate };

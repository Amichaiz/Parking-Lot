// utils/googleVision.js
const vision = require('@google-cloud/vision');
const path = require('path');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(process.cwd(), './secret.json'), // Make sure this path is correct
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

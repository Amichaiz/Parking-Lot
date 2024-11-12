// utils/googleVision.js
const vision = require('@google-cloud/vision');


const jsonString = process.env.JSON_SECRET;

const jsonObject = JSON.parse(jsonString);
console.log('JSON_SECRET:', process.env.jsonString);

// Creates a client
const client = new vision.ImageAnnotatorClient({
    credentials: jsonObject
});

async function detectLicensePlate(fileBuffer) {
    const [result] = await client.textDetection(fileBuffer);
    const detections = result.textAnnotations;

    if (detections.length > 0) {
        // Get the first detection and apply regex to filter only letters and numbers
        const rawText = detections[0].description.trim();

        // Regular expression to match only alphanumeric characters (ignores special chars, spaces, etc.)
        const licensePlateText = rawText.replace(/[^0-9]/g, '');

        return licensePlateText;
    }
    return null;
}

module.exports = { detectLicensePlate };

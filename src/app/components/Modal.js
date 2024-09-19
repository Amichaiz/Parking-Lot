export default function LeavingModal({ licensePlate, enterTime, leaveTime, parkingDuration, fare, onClose }) {
    const formatLicensePlate = (plate) => {
        if (plate.length === 7) {
            return `${plate.slice(0, 3)}-${plate.slice(3, 5)}-${plate.slice(5)}`;
        } else if (plate.length === 8) {
            return `${plate.slice(0, 2)}-${plate.slice(2, 5)}-${plate.slice(5)}`;
        }
        return plate;
    };

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleString('en-GB', {
            hour12: false,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Parking Ticket</h2>
                <p>License Plate: {formatLicensePlate(licensePlate)}</p>
                {enterTime && <p>Entered at: {formatTime(enterTime)}</p>}
                {leaveTime && <p>Left at: {formatTime(leaveTime)}</p>}
                {parkingDuration && <p>Parking Duration: {(parkingDuration / 60).toFixed(2)} Hours</p>}
                {(fare || fare == 0) && <p className="text-xl font-bold mt-4">Total Fare: ${fare}</p>}
                <button
                    className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

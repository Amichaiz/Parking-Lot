"use client"
import React, { useState } from 'react';

const ParkingRatesModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <button
                onClick={handleOpen}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                <b>Rates</b>
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Parking Rates</h2>
                        <p className="mb-2"><strong>First 15 minutes:</strong> Free</p>
                        <p className="mb-2"><strong>Up to 1 hour:</strong> $10 </p>
                        <p className="mb-2"><strong>every 15 minutes:</strong> an additional $2.50</p>
                        <p className="mb-2"><strong>Regular:</strong> Free</p>
                        <p className="mb-2"><strong>Handicap:</strong> After the first 15 minutes, every 15 minutes is $1.50</p>
                        <p><strong>Local:</strong> After the first 15 minutes, every 15 minutes is $2.50</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParkingRatesModal;

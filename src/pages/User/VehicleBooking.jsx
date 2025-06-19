import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../config/axiosinstance'
import VehicleDetails from '../../components/VehicleDetails';
import { useSelector } from 'react-redux';
import { TbEdit } from "react-icons/tb";

const VehicleBooking = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    console.log(id);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await api.get(`user/getVehicle/${id}`);
                setVehicle(res.data);


            } catch (err) {
                console.error('Failed to load vehicle:', err);
            }
        };

        fetchVehicle();
    }, [id]);
    const bookingData = useSelector((state) => state.booking.bookingData);
    const [formData, setFormData] = useState(bookingData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const getCurrentDateTime = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16);
    };

    const minDateTime = getCurrentDateTime();
    if (!vehicle) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-6 p-4  mx-auto'>
            <div>
                 <VehicleDetails vehicle={vehicle.vehicle}  />
            </div>
           
            <div>
                <div className="relative max-w-6xl mx-auto mt-8 p-4 md:p-6 bg-white shadow-lg rounded-2xl">
                    <TbEdit className='absolute right-8 top-4 text-xl'/>
                    <form
                        
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
                    >
                        {/* Pickup Location */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                placeholder={formData?.pickupLocation?formData.pickupLocation:'Enter pickup location'}
                            />
                        </div>

                        {/* Dropoff Location */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Dropoff Location
                            </label>
                            <input
                                type="text"
                                name="dropoffLocation"
                                value={formData.dropoffLocation}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                placeholder="Enter dropoff location"
                            />
                        </div>

                        {/* Pickup DateTime */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Pickup Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="pickupDateTime"
                                value={formData.pickupDateTime}
                                onChange={handleChange}
                                min={minDateTime}
                                required
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                        </div>

                        {/* Dropoff DateTime */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Dropoff Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="dropoffDateTime"
                                value={formData.dropoffDateTime}
                                onChange={handleChange}
                                min={formData.pickupDateTime || minDateTime}
                                required
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                        </div>

                        {/* Submit Button - full width below on mobile */}
                        <div className="col-span-full">
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition font-medium text-center"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default VehicleBooking;

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../../config/axiosinstance'; 
import { useSelector } from 'react-redux'; 

const AddVehicle = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const { userData, isLogedin } = useSelector(state => state.user); 

    const token = localStorage.getItem('token');


    const formik = useFormik({
        initialValues: {
            type: '',
            brand: '',
            model: '',
            year: '',
            fuel: '',
            transmission: '',
            registrationNumber: '',
            images: [],
            pricePerDay: '',
            longitude: '',
            latitude: ''
        },
        validationSchema: Yup.object({
            type: Yup.string().required(),
            brand: Yup.string().required(),
            model: Yup.string().required(),
            year: Yup.number().required().min(1900).max(new Date().getFullYear()),
            fuel: Yup.string().required(),
            transmission: Yup.string().required(),
            registrationNumber: Yup.string().required(),
            images: Yup.mixed().required(),
            pricePerDay: Yup.number().required().positive(),
            longitude: Yup.number().required(),
            latitude: Yup.number().required()
        }),
        onSubmit: async (values) => {
            try {
                console.log("hai");
                
                const formData = new FormData();
                formData.append('type', values.type);
                formData.append('brand', values.brand);
                formData.append('model', values.model);
                formData.append('year', values.year);
                formData.append('fuel', values.fuel);
                formData.append('transmission', values.transmission);
                formData.append('registrationNumber', values.registrationNumber);
                formData.append('pricePerDay', values.pricePerDay);
                formData.append('location[type]', 'Point');
                formData.append('longitude', values.longitude);
                formData.append('latitude', values.latitude);
                formData.append('ownerId', userData._id);

                for (let i = 0; i < values.images.length; i++) {
                    formData.append('images', values.images[i]);
                }
                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                }
                const response = await api.post('host/addVehicle', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                alert('Vehicle added successfully!');
                formik.resetForm();
                setImagePreviews([]);

            } catch (error) {
                console.log('Add Vehicle Error:', error?.response?.data || error.message);
                alert(error?.response?.data?.error || 'Failed to add vehicle');
            }
        }
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        formik.setFieldValue('images', files);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>

            <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="space-y-4">
                {/* Type */}
                <div>
                    <label>Type</label>
                    <select name="type" onChange={formik.handleChange} value={formik.values.type} className="w-full border p-2">
                        <option value="">Select</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                    </select>
                </div>

                {/* Brand / Model */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label>Brand</label>
                        <input type="text" name="brand" onChange={formik.handleChange} value={formik.values.brand} className="w-full border p-2" />
                    </div>
                    <div className="flex-1">
                        <label>Model</label>
                        <input type="text" name="model" onChange={formik.handleChange} value={formik.values.model} className="w-full border p-2" />
                    </div>
                </div>

                {/* Year / Price */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label>Year</label>
                        <input type="number" name="year" onChange={formik.handleChange} value={formik.values.year} className="w-full border p-2" />
                    </div>
                    <div className="flex-1">
                        <label>Price per Day</label>
                        <input type="number" name="pricePerDay" onChange={formik.handleChange} value={formik.values.pricePerDay} className="w-full border p-2" />
                    </div>
                </div>

                {/* Fuel / Transmission */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label>Fuel</label>
                        <select name="fuel" onChange={formik.handleChange} value={formik.values.fuel} className="w-full border p-2">
                            <option value="">Select</option>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="electric">Electric</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label>Transmission</label>
                        <select name="transmission" onChange={formik.handleChange} value={formik.values.transmission} className="w-full border p-2">
                            <option value="">Select</option>
                            <option value="manual">Manual</option>
                            <option value="automatic">Automatic</option>
                        </select>
                    </div>
                </div>

                {/* Registration */}
                <div>
                    <label>Registration Number</label>
                    <input type="text" name="registrationNumber" onChange={formik.handleChange} value={formik.values.registrationNumber} className="w-full border p-2" />
                </div>

                {/* Coordinates */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label>Longitude</label>
                        <input type="number" name="longitude" onChange={formik.handleChange} value={formik.values.longitude} className="w-full border p-2" />
                    </div>
                    <div className="flex-1">
                        <label>Latitude</label>
                        <input type="number" name="latitude" onChange={formik.handleChange} value={formik.values.latitude} className="w-full border p-2" />
                    </div>
                </div>

                {/* Images */}
                <div>
                    <label>Vehicle Images</label>
                    <input type="file" multiple onChange={handleImageChange} className="w-full border p-2" />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {imagePreviews.map((src, idx) => (
                            <img key={idx} src={src} alt="preview" className="w-24 h-24 object-cover rounded" />
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddVehicle;

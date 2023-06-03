import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateConstituencyForm = () => {
    const navigate = useNavigate();
    const [constituencyData, setConstituencyData] = useState({
        name: '',
        location: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/admin/create_constituency", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(constituencyData)
            });

            const data = await response.json();
            if (data.success) {
                alert("Constituency created successfully");
                navigate("/admin/dashboard");
            } else {
                alert("Failed to create constituency");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        setConstituencyData({ ...constituencyData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create a New Constituency</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 d-flex justify-content-center">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            style={{ width: "40%" }}
                            value={constituencyData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="location" className="col-sm-3 col-form-label">Location:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="location"
                            style={{ width: "40%" }}
                            name="location"
                            value={constituencyData.location}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-9 offset-sm-3">
                        <button type="submit" className="btn btn-primary">Create Constituency</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateConstituencyForm;

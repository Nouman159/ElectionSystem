import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateElectionForm = () => {
    const navigate = useNavigate();
    const [electionData, setElectionData] = useState({
        name: '',
        electionDate: '',
        startTime: '',
        endTime: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/admin/create_election", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: electionData.name,
                    electionDate: electionData.electionDate,
                    startTime: electionData.startTime,
                    endTime: electionData.endTime
                })
            });

            const data = await response.json();
            if (data.success) {
                alert("Election created successfully");
                navigate("/admin/dashboard");
            } else {
                alert("Failed to create election");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        setElectionData({ ...electionData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create a New Election</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 d-flex justify-content-center">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            style={{ width: "40%" }}
                            value={electionData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="electionDate" className="col-sm-3 col-form-label">Election Date:</label>
                    <div className="col-sm-9">
                        <input
                            type="date"
                            id="electionDate"
                            style={{ width: "40%" }}
                            name="electionDate"
                            value={electionData.electionDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="startTime" className="col-sm-3 col-form-label">Start Time:</label>
                    <div className="col-sm-9">
                        <input
                            type="time"
                            id="startTime"
                            style={{ width: "40%" }}
                            name="startTime"
                            value={electionData.startTime}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="endTime" className="col-sm-3 col-form-label">End Time:</label>
                    <div className="col-sm-9">
                        <input
                            type="time"
                            id="endTime"
                            style={{ width: "40%" }}
                            name="endTime"
                            value={electionData.endTime}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-9 offset-sm-3">
                        <button type="submit" className="btn btn-primary">Create Election</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateElectionForm;


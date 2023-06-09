





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreatePartyForm = () => {
    const navigate = useNavigate();
    const [partyData, setPartyData] = useState({
        name: '',
        abbreviation: '',
        symbol: '',
        foundedYear: '',
        ideology: '',
        description: '',
        leader: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/admin/create_party", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: partyData.name,
                abbreviation: partyData.abbreviation,
                symbol: partyData.symbol,
                foundedYear: partyData.foundedYear,
                ideology: partyData.ideology,
                description: partyData.description,
                leader: partyData.leader
            })
        })
        const data = await response.json();
        console.log(data);
        if (data.success) {
            alert("party created successfully");
            navigate("/admin/dashboard");
        }
    };
    const handleChange = (e) => {
        setPartyData({ ...partyData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create a New Party</h2>
            <form onSubmit={handleSubmit} >


                <div className="row mb-3">
                    <label htmlFor="symbol" className="col-sm-3 col-form-label">Symbol:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            style={{ width: "40%" }}
                            id="symbol"
                            name="symbol"
                            value={partyData.symbol}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                    <div className="row mb-3" >
                        <label htmlFor="abbreviation" className="col-sm-3 col-form-label">Abbreviation:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="abbreviation"
                                style={{ width: "40%" }}
                                name="abbreviation"
                                value={partyData.abbreviation}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>     <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
                    <div className="col-sm-9  ">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            style={{ width: "40%" }}
                            value={partyData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* ...other form fields... */}
                <div className="row mb-3">
                    <label htmlFor="foundedYear" className="col-sm-3 col-form-label">Founded Year:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="foundedYear"
                            name="foundedYear"
                            value={partyData.foundedYear}
                            style={{ width: "40%" }}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="ideology" className="col-sm-3 col-form-label">Ideology:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="ideology"
                            name="ideology"
                            style={{ width: "40%" }}
                            value={partyData.ideology}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-3 col-form-label">Description:</label>
                    <div className="col-sm-9">
                        <textarea
                            id="description"
                            name="description"
                            value={partyData.description}
                            style={{ width: "40%" }}
                            onChange={handleChange}
                            className="form-control"
                        ></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="leader" className="col-sm-3 col-form-label">Leader:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="leader"
                            name="leader"
                            style={{ width: "40%" }}
                            value={partyData.leader}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-9 offset-sm-3">
                        <button type="submit" className="btn btn-primary">Create Party</button>
                    </div>
                </div>
            </form>

        </div>
    );



};

export default CreatePartyForm;


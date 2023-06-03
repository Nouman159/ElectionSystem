import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreateCandidateForm = () => {

    const navigate = useNavigate();
    const [candidateData, setCandidateData] = useState({
        party_name: '',
        constituency: '',
    });
    const [partyNames, setPartyNames] = useState([]);
    const [constituencyNames, setConstituencyNames] = useState([]);

    useEffect(() => {
        fetchPartyNames();
    }, []);

    const fetchPartyNames = async () => {
        try {
            const response = await fetch('http://localhost:5000/party/data');
            const data = await response.json();

            if (data.success) {
                setPartyNames(data.partyNames);
                setConstituencyNames(data.constituencyNames);
                console.log("success");
                // Use the party names in your frontend logic
                console.log(data.partyNames);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error fetching party names:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!candidateData.party_name || !candidateData.constituency) {
            alert('Please select a party and enter the constituency.');
            return;
        }
        const response = await fetch('http://localhost:5000/admin/create_candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: localStorage.name,
                cnic: localStorage.cnic,
                party_name: candidateData.party_name,
                constituency: candidateData.constituency
            }),
        });
        const data = await response.json();
        // console.log(data);
        if (data.success) {
            alert('Registered as candidate successfully');
            localStorage.setItem("candidateToken", data.candidateToken);
            localStorage.setItem("candidate_id", data.id);
            navigate('/voterhome');
        }
        else {
            alert("Network Issue ! Try Later");
        }
    };

    const handleChange = (e) => {
        setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create a New Candidate</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 input-row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                        Name:
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={localStorage.name}
                            readOnly
                            className="form-control"
                            style={{ width: '40%' }}
                        />
                    </div>
                </div>

                <div className="row mb-3 input-row">
                    <label htmlFor="cnic" className="col-sm-3 col-form-label">
                        CNIC:
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="cnic"
                            name="cnic"
                            value={localStorage.cnic}
                            readOnly
                            className="form-control"
                            style={{ width: '40%' }}
                        />
                    </div>
                </div>

                <div className="row mb-3 input-row">
                    <label htmlFor="party_name" className="col-sm-3 col-form-label">
                        Party:
                    </label>
                    <div className="col-sm-9 select-wrapper">
                        <div className="select-container">
                            <select
                                id="party_name"
                                name="party_name"
                                value={candidateData.party_name}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="" disabled defaultValue="">
                                    Select party
                                </option>
                                {partyNames.map((partyName, index) => (
                                    <option key={index} value={partyName}>
                                        {partyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 input-row">
                    <label htmlFor="constituency" className="col-sm-3 col-form-label">
                        Constituency:
                    </label>
                    <div className="col-sm-9 select-wrapper">
                        <div className="select-container">
                            <select
                                id="constituency"
                                name="constituency"
                                value={candidateData.constituency}
                                onChange={handleChange}
                                className="form-control"
                                style={{ width: '100%' }}
                                aria-label="Constituency"
                            >
                                <option value="" disabled defaultValue="">
                                    Select Constituency
                                </option>
                                {constituencyNames.map((constituencyName, index) => (
                                    <option key={index} value={constituencyName}>
                                        {constituencyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-9 offset-sm-3">
                        <button type="submit" className="btn btn-primary">
                            Apply
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default CreateCandidateForm;

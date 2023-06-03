import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [constituencyNames, setConstituencyNames] = useState([]);

    useEffect(() => {
        fetchPartyNames();
    }, []);
    const fetchPartyNames = async () => {
        try {
            const response = await fetch('http://localhost:5000/party/data');
            const data = await response.json();

            if (data.success) {
                setConstituencyNames(data.constituencyNames);
                console.log("success");
                // Use the party names in your frontend logic
                console.log(data.sonstituencyNames);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error fetching party names:', error);
        }
    };
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cnic: "",
        constituency: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.constituency === "") {
            alert("Please select a constituency");
            return;
        }
        const response = await fetch("http://localhost:5000/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, cnic: credentials.cnic, constituency: credentials.constituency }),
        })
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
        else {
            navigate('/login');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="row g-3" >
                        <div className="col-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="cnic" className="form-label">CNIC</label>
                            <input type="text" className="form-control" id="cnic" name="cnic" value={credentials.cnic} onChange={onChange} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="constituency" className="form-label">Constituency</label>
                            <select className="form-select" id="constituency" name="constituency" value={credentials.constituency} onChange={onChange}>
                                <option value="" disabled defaultValue="" >Select Constituency</option>
                                {constituencyNames.map((constituency, index) => (
                                    <option key={index} value={constituency}>{constituency}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 d-grid">
                            <button type="button" className="btn btn-danger" onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

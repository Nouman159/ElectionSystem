import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../election.css';
import { useNavigate } from 'react-router-dom';

export default function Candidates({ constituency }) {
    const navigate = useNavigate();

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (selectedOption === '') {
            return;
        }

        const res = await fetch(`http://localhost:5000/election/submit/${selectedOption}/${localStorage.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await res.json();

        if (json.success) {
            toast.success('Vote Casted Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
            });
            // navigate('/voterhome');
            setTimeout(() => {
                navigate('/voterhome');
            }, 4000);
        } else {
            toast.error('Try Later! Server overloaded', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
                navigate('/voterhome');
            }, 4000);
            // navigate('/voterhome');
        }
    };

    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        console.log(constituency);
        fetchCandidates();
    }, [constituency]);

    const [selectedOption, setSelectedOption] = useState(null);
    const handleCheckboxChange = (event) => {
        const s = event.target.value;
        setSelectedOption(s);
    };
    console.log(selectedOption);
    const [info, setInfo] = useState(null);
    const fetchCandidates = async () => {
        try {
            const response = await fetch(`http://localhost:5000/election_candidates/${localStorage.constituency}/${localStorage.id}`);
            const data = await response.json();
            if (data.success) {
                setCandidates(data.candidates);
                setInfo(data.vote);
                console.log('success');
                console.log(data.candidates);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    return (
        <div>
            {(info) ? "Already Voted" :
                candidates.length === 0 ? "No candidates in this constituency" :
                    (
                        <>
                            <h2>Vote for constituency: {localStorage.constituency}</h2>
                            <ToastContainer /> {/* Include the ToastContainer component */}
                            <form className="candidates-container" onSubmit={handleSubmission}>
                                {candidates.map((val, index) => (
                                    <label key={index} className="candidate-label">
                                        <input
                                            type="checkbox"
                                            name="option"
                                            value={val.id}
                                            checked={selectedOption === val.id}
                                            onChange={(event) => {
                                                handleCheckboxChange(event);
                                            }}
                                            className="candidate-checkbox"
                                        />
                                        <span className="candidate-name">{val.name}</span>
                                        <span className="candidate-party">{val.party}</span>
                                    </label>
                                ))}
                                <button className="vote-button btn-danger">Submit Vote</button>
                            </form>
                        </>
                    )}
        </div>
    );
}

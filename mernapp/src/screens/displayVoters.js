import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Voterhome = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [electionEvents, setElectionEvents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(localStorage.getItem('authToken') + ' hello');
                const response = await fetch('http://localhost:5000/getElectionEvents', {
                    headers: {
                        'Authorization': localStorage.getItem('authToken')
                    }
                });

                if (response.status === 401) {
                    navigate('/login');
                } else {
                    const data = await response.json();
                    if (response.ok) {
                        setElectionEvents(data.electionEvents);
                        setLoading(false);
                    } else {
                        console.log('Failed to fetch election events:', response.status);
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        fetchData();
    });

    return (
        <div>
            {
                !loading ?
                    <>
                        <h2>Election Events</h2>
                        <ul>
                            {electionEvents.map((event, index) => (
                                <li key={index}>{event.name}</li>
                            ))}
                        </ul>
                    </> : "Loading Content"
            }
        </div>
    );
};

export default Voterhome;


import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ElectionCard from '../Components/ElectionEvents';
import { useNavigate } from 'react-router-dom';
export default function Voterhome() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/getElectionEvents",
                    {
                        headers: {
                            'Authorization': localStorage.getItem('authToken')
                        }
                    });
                const json = await response.json();
                console.log(json);
                if (json.access === 'false') {
                    navigate('/login');
                    return;
                }
                setData(json.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate]);
    console.log(data);
    return (
        <div>
            <Navbar />
            <div>Welcome to our system</div>

            <img
                src="https://images.pexels.com/photos/8850708/pexels-photo-8850708.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="img-fluid mt-3"
                style={{
                    width: '96%',
                    height: '460px',
                }}
                alt="Election"
            />
            <h2 style={{ "marginTop": "20px" }}>Election Upcoming Events are here</h2>
            {data.map((item, index) => (
                <ElectionCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    date={item.electionDate}
                    startTime={item.startTime}
                    endTime={item.endTime}
                />
            ))}
        </div>
    );
}

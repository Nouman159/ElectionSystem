import React, { useEffect, useState } from 'react';

const VotersList = () => {
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        // Make an API request to fetch the voters list
        console.log(localStorage.candidate_id);
        fetch(`http://localhost:5000/voters/list/${localStorage.candidate_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setVoters(data.voters);
                } else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, []);
    return (
        <div>
            <h2>Voters List</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {voters.map((voter, index) => (

                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{voter.name}</td>
                            <td>{voter.email}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default VotersList;

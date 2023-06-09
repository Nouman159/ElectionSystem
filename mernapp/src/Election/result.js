import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../result.css';
export default function Result() {
    const { id } = useParams();
    const [groupedResults, setGroupedResults] = useState([]);
    const [electionName, setName] = useState('');
    useEffect(() => {
        const gettingResults = async () => {
            try {
                const response = await fetch(`http://localhost:5000/election/result/${id}`);
                const data = await response.json();
                if (data.success) {
                    setGroupedResults(data.result);
                    setName(data.elect[0].election.name);
                    console.log("Here are the results");
                }
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        gettingResults();
    }, [id]);
    // console.log(groupedResults);
    return (
        <div>
            <h2 className='mb-3 mt-3'>{electionName}</h2>
            <div className='container'>

                {groupedResults.map((result) => (
                    <div key={result.name}>
                        {result.results.length > 0 ? (
                            <>
                                <h2>{result.name}</h2>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Candidate</th>
                                            <th>Votes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.results.map((candidate, index) => (
                                            <tr
                                                key={candidate._id}
                                                className={candidate.isWinner ? 'winner-row' : ''}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{candidate.candidate.name}</td>
                                                <td>{candidate.voteCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                ))}

            </div>

        </div>

    )
}

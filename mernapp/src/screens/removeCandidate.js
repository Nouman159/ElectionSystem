import React from 'react'
import Navbar from '../Components/Navbar';

export default function RemoveCandidate() {
    localStorage.removeItem('candidateToken');
    localStorage.removeItem('candidate_id');
    return (
        <div>
            <Navbar />
            <div>
                Removed success
            </div>
        </div>
    )
}

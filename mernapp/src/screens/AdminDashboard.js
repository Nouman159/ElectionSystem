import React from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1 className="mb-4">Welcome, Administrator!</h1>
                <p>This is the administrator home page.</p>

                <div className="card">
                    <div className="card-body">
                        <h2>Actions:</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="/admin/create_party" className="card-link">
                                    Create New Party
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/admin/create_constituency" className="card-link">
                                    Create New Constituency
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link to="/admin/create_election" className="card-link">
                                    Create Election
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

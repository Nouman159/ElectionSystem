import React from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("name");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("constituency");
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/voterhome">
                        Election System
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active fs-5"
                                    aria-current="page"
                                    to={!localStorage.getItem("adminToken") ? "/voterhome" : "/admin/dashboard"}
                                >
                                    Home
                                </Link>

                            </li>
                        </ul>
                        {(!localStorage.getItem("authToken") && !localStorage.getItem("adminToken")) ? (
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">
                                    Login
                                </Link>
                                <Link className="btn bg-white text-success mx-1" to="/creatuser">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <>
                                {(!localStorage.getItem("adminToken")) ? (
                                    <>

                                        <div className="d-flex">
                                            <Link to="/voter/profile" className="btn bg-white text-success mx-1">
                                                Profile
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="d-flex">
                                            <Link className="btn bg-white text-success mx-1" to="">
                                                abc
                                            </Link>
                                        </div>
                                    </>
                                )
                                }
                                {(!localStorage.getItem("candidate_id")) ?
                                    (<>
                                        <div className="d-flex">

                                            <Link to="/admin/create_candidate" className="btn bg-white text-success mx-1">
                                                Apply Candidate
                                            </Link>

                                        </div>
                                    </>) :
                                    (<>
                                        <div className="d-flex">

                                            <Link to="/voters/list" className="btn bg-white text-success mx-1">
                                                View Voters
                                            </Link>

                                        </div>
                                        <div className="d-flex">

                                            <Link to="/remove/candidate" className="btn bg-white text-success mx-1">
                                                Remove me as candidate
                                            </Link>

                                        </div>
                                    </>)
                                }
                                <div>
                                    <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </nav>
        </div>

    )
}
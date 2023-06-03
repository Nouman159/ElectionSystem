import React from 'react';

const Profile = ({ name, email, cnic, constituency }) => {
    return (
        <>

            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Profile</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={email} readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">CNIC</label>
                                    <input type="text" className="form-control" value={cnic} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Constituency</label>
                                    <input type="text" className="form-control" value={constituency} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

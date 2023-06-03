import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const TimeComponent = ({ electionDate, startTime }) => {
    const [isTimeReached, setIsTimeReached] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nowDate = now.toISOString().split('T')[0]; // Get the date in the format "YYYY-MM-DD"
            const nowTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const startTimeTime = startTime.replace(/(\d{1,2}):(\d{2}) ([AP]M)/, '$1:$2');

            const formattedElectionDate = electionDate.split('T')[0]; // Get the date part from electionDate

            if (nowDate === formattedElectionDate && nowTime >= startTimeTime) {
                setIsTimeReached(true);
                clearInterval(interval);
            }

        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [electionDate, startTime]);

    return (
        <div>
            {isTimeReached ? (
                <Link to="/election/event" className="card-link">
                    Cast Your vote
                </Link>
            ) : <Link to="" className="card-link">
                Election Coming soon
            </Link>}
        </div>
    );
};

export default TimeComponent;

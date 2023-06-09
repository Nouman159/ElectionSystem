import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const TimeComponent = ({ id, electionDate, startTime, endTime }) => {
    const [isTimeReached, setIsTimeReached] = useState(false);
    const [isElectionEnded, setIsElectionEnded] = useState(false);

    const handleElectionResult = useCallback(async () => {
        const response = await fetch(`http://localhost:5000/election/result/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (!json.success) {
            console.log('Results Not manipulated');
        } else if (json.success) {
            console.log('Results Calculated Successful');
        }
    }, [id]);

    useEffect(() => {
        handleElectionResult();
    }, [handleElectionResult]);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nowDate = now.toISOString().split('T')[0]; // Get the date in the format "YYYY-MM-DD"
            const nowTime = now.toLocaleTimeString('en-US', { hour12: false }); // Get the time in a 24-hour format
            const startTimeTime = startTime.replace(/(\d{1,2}):(\d{2}) ([AP]M)/, (match, hour, minute, meridiem) => {
                if (meridiem === 'PM' && parseInt(hour, 10) !== 12) {
                    hour = String(parseInt(hour, 10) + 12);
                } else if (meridiem === 'AM' && parseInt(hour, 10) === 12) {
                    hour = '00';
                }
                return `${hour}:${minute}`;
            });
            const endTimeTime = endTime.replace(/(\d{1,2}):(\d{2}) ([AP]M)/, (match, hour, minute, meridiem) => {
                if (meridiem === 'PM' && parseInt(hour, 10) !== 12) {
                    hour = String(parseInt(hour, 10) + 12);
                } else if (meridiem === 'AM' && parseInt(hour, 10) === 12) {
                    hour = '00';
                }
                return `${hour}:${minute}`;
            });

            const formattedElectionDate = electionDate.split('T')[0]; // Get the date part from electionDate

            if (nowDate === formattedElectionDate && nowTime >= startTimeTime && nowTime < endTimeTime) {
                setIsTimeReached(true);
                setIsElectionEnded(false);
                clearInterval(interval);
            } else if (nowTime >= endTimeTime) {
                setIsTimeReached(false);
                setIsElectionEnded(true);
                handleElectionResult();
                clearInterval(interval);
            }
            else if (nowDate > formattedElectionDate) {
                setIsTimeReached(false);
                setIsElectionEnded(true);
                clearInterval(interval);
            }

        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [handleElectionResult, electionDate, startTime, endTime]);

    console.log(isElectionEnded);
    console.log(isTimeReached);

    return (
        <div>
            {isTimeReached ? (
                <Link to="/election/event" className="card-link">
                    Cast Your vote
                </Link>
            ) : isElectionEnded ? (
                <Link to={`/election/results/${id}`} className="card-link">
                    Election Ended, View Results
                </Link>
            ) : (
                <p>Election Coming soon</p>
            )}
        </div>
    );
};

export default TimeComponent;

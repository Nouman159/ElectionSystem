import React from 'react';
import '../election.css'; // Import CSS file for styling
import TimeComponent from './time';
// import { useEffect } from 'react';
const ElectionCard = ({ id, name, date, startTime, endTime }) => {
    // Helper function to format the date and time
    console.log(id);
    console.log(date);
    const formatDate = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateTime).toLocaleDateString('en-US', options);
    };
    const formatDateTime2 = (dateTime) => {
        const timeFormat = /^(\d{1,2}):(\d{2}) ([AP]M)$/;
        const [, hours, minutes, meridian] = timeFormat.exec(dateTime) || [];
        const formattedTime = `${hours}:${minutes} ${meridian}`;

        return formattedTime;
    };

    return (
        <>
            <div className="election-card">
                <h2 className="election-card__name">{(name)}</h2>
                <p className="election-card__date">Date: {formatDate(date)}</p>
                <p className="election-card__time">Time: {formatDateTime2(startTime)} - {formatDateTime2(endTime)}</p>
                <TimeComponent id={id} electionDate={date} startTime={startTime} endTime={endTime} />
            </div>
        </>
    );
};

export default ElectionCard;

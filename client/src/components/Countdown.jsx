import React, { useEffect, useState } from 'react';
import '../styles/Countdown.css';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();
        let timeLeft = {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
        };

        if (difference > 0) {
            timeLeft = {
                days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
                minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Días', value: timeLeft.days },
        { label: 'Horas', value: timeLeft.hours },
        { label: 'Minutos', value: timeLeft.minutes },
        { label: 'Segundos', value: timeLeft.seconds },
    ];

    return (
        <div className="countdown-container">
            <h1 className="title">¡Mis 15!</h1>
            <div className="countdown-timer">
                {timeUnits.map((unit, index) => (
                    <React.Fragment key={unit.label}>
                        <div className="time-box">
                            <div className="time-number">{unit.value}</div>
                            <div className="time-label">{unit.label}</div>
                        </div>
                        {index < timeUnits.length - 1 && (
                            <div className="colon">:</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Countdown;

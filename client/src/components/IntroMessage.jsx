// src/components/IntroMessage.jsx
import React from 'react';
import '../styles/IntroMessage.css';

function IntroMessage({ mensaje }) {
    return (
        <div className="introMessageContainer">
            <h2>{mensaje}</h2>
        </div>
    );
}

export default IntroMessage;

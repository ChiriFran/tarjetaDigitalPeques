import React, { useState, useEffect, useRef } from 'react';
import '../styles/PasswordOverlay.css';
import { gsap } from 'gsap';

import iconAudioOn from '../../media/icons/musicOn.webp'
import iconAudioOff from '../../media/icons/musicOff.webp'

const PasswordOverlay = ({ musicRef }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const [passwordPreviouslyEntered, setPasswordPreviouslyEntered] = useState(false);
    const [error, setError] = useState('');

    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const dismissed = localStorage.getItem('passwordOverlayDismissed');
        if (dismissed === 'true') {
            setPasswordPreviouslyEntered(true);
        }
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
    }, []);

    useEffect(() => {
        if (isVisible && !isHiding) {
            const tl = gsap.timeline();
            tl.fromTo(containerRef.current,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.5 }  // antes 1
            );
            tl.fromTo('.password-container-title',
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.25 }  // antes 0.5
            );
            tl.fromTo('.password-container-subtitle',
                { y: -10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.25 },
                "-=0.15"  // antes "-=0.3"
            );

            if (!passwordPreviouslyEntered) {
                tl.fromTo('.input',
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.25 }  // antes 0.5
                );
                tl.fromTo('.button',
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.25 }  // antes 0.5
                );
            } else {
                tl.fromTo('.button',
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.25 }  // antes 0.5
                );
            }
        }
    }, [isVisible, isHiding, passwordPreviouslyEntered]);

    const closeOverlay = (playMusic = true) => {
        setIsHiding(true);
        if (playMusic && musicRef?.current) musicRef.current.playMusic();

        gsap.to(containerRef.current, {
            x: '-100%',
            opacity: 0,
            duration: 0.4,  // antes 0.8
            ease: 'power3.in',
            onComplete: () => {
                setIsVisible(false);
                setIsHiding(false);
                document.body.style.overflow = 'auto';
            },
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!passwordPreviouslyEntered) {
            const enteredPassword = inputRef.current.value;
            if (enteredPassword === import.meta.env.VITE_PASSWORD) {
                localStorage.setItem('passwordOverlayDismissed', 'true');
                setPasswordPreviouslyEntered(true);
                setError('');
                closeOverlay(true); // activa música
            } else {
                setError('Contraseña incorrecta.');
            }
        } else {
            closeOverlay(true); // activa música
        }
    };

    const handleNoMusic = () => {
        closeOverlay(false); // sin música
    };

    if (!isVisible) return null;

    return (
        <div className="password-overlay" ref={overlayRef}>
            <div className="password-container" ref={containerRef}>
                <h2 className="password-container-title">Bienvenidos</h2>
                <p className="password-container-subtitle">
                    NOS EMBARCAMOS EN UNA AVENTURA QUE NO ESTARÍA COMPLETA SIN TU PRESENCIA
                </p>
                {!passwordPreviouslyEntered ? (
                    <form onSubmit={handleSubmit}>
                        <input className="input" type="text" placeholder="Ingresá la contraseña" ref={inputRef} />
                        {error && <p className='error'>{error}</p>}
                        <button className="button" type="submit"><img src={iconAudioOn} alt="music on" />Ingresar con música</button>
                        <button className="button" type="button" onClick={handleNoMusic}><img src={iconAudioOff} alt="music off" />Ingresar sin música</button>
                    </form>
                ) : (
                    <>
                        <button className="button" onClick={handleSubmit}><img src={iconAudioOn} alt="music on" />Ingresar con música</button>
                        <button className="button" onClick={handleNoMusic}><img src={iconAudioOff} alt="music off" />Ingresar sin música</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PasswordOverlay;

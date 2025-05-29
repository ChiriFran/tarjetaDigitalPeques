import React from 'react';
import '../styles/GoogleMapsDirections.css';
import iconMapsLogo from '../../media/icons/location.webp';

const GoogleMapsDirections = () => {
    const direccionCeremonia = 'José Bianco 1521, El Palomar';
    const direccionFiesta = 'Lynch 1869, Beccar';

    const getMapEmbedUrl = (direccion) =>
        `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;

    const getGoogleMapsUrl = (direccion) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

    return (
        <div className="mapa-contenedor">
            <div className="mapa-seccion">
                <h2>
                    <img src={iconMapsLogo} alt="Ceremonia" className="icono-titulo" />
                    Ceremonia
                </h2>
                <p>{direccionCeremonia}</p>
                <iframe
                    title="Mapa Ceremonia"
                    src={getMapEmbedUrl(direccionCeremonia)}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a
                    href={getGoogleMapsUrl(direccionCeremonia)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mapa-boton"
                >
                    Abrir en Google Maps
                </a>
            </div>

            <div className="mapa-seccion">
                <h2>
                    <img src={iconMapsLogo} alt="Fiesta" className="icono-titulo" />
                    Fiesta
                </h2>
                <p>{direccionFiesta}</p>
                <iframe
                    title="Mapa Fiesta"
                    src={getMapEmbedUrl(direccionFiesta)}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a
                    href={getGoogleMapsUrl(direccionFiesta)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mapa-boton"
                >
                    Abrir en Google Maps
                </a>
            </div>
        </div>
    );
};

export default GoogleMapsDirections;

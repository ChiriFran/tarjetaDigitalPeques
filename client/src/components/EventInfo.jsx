import iconRecepcion from '../../media/icons/recepcion.webp'
import iconBaile from '../../media/icons/baile.webp'
import iconFiesta from '../../media/icons/fiesta.webp'
import iconFecha from '../../media/icons/calendario.webp'
import iconDresscode from '../../media/icons/mono.webp'
import iconComida from '../../media/icons/comida.webp'
import iconVideos from '../../media/icons/videos.webp'
import iconCena from '../../media/icons/cena.webp'

import "../styles/EventInfo.css";

function EventInfo() {
    // Info arriba de la tarjeta
    const infoTop = [
        {
            icon: <img src={iconFecha} alt="icono" className="iconImg iconTopBottom" />,
            title: "¿Cuando nos vemos?",
            subtitle: "10-9-25",
        },
    ];

    // Info dentro de la tarjeta (Itinerario)
    const eventDetails = [
        {
            icon: <img src={iconRecepcion} alt="icono" className="iconImg" />,
            title: "Recepcion",
            subtitle: "21:00 hs",
        },
        {
            icon: <img src={iconCena} alt="icono" className="iconImg" />,
            title: "Cena",
            subtitle: "22:00 hs",
        },
        {
            icon: <img src={iconFiesta} alt="icono" className="iconImg" />,
            title: "Fiesta",
            subtitle: "22:45 hs",
        },
        {
            icon: <img src={iconBaile} alt="icono" className="iconImg" />,
            title: "Baile",
            subtitle: "23:45 hs",
        },
        {
            icon: <img src={iconVideos} alt="icono" className="iconImg" />,
            title: "Videos",
            subtitle: "24:00 hs",
        },
        {
            icon: <img src={iconComida} alt="icono" className="iconImg" />,
            title: "Comida",
            subtitle: "04:00 hs",
        },
    ];

    // Info abajo de la tarjeta
    const infoBottom = [
        {
            icon: <img src={iconDresscode} alt="icono" className="iconImg iconTopBottom" />,
            title: "Dress Code",
            subtitle: "ELEGANTE SPORT",
        },
    ];

    const renderInfoList = (list) => (
        <div className="event-info-list">
            {list.map((item, index) => (
                <div key={index} className="event-info-item">
                    <div className="event-card__icon">{item.icon}</div>
                    <div className="event-card__text">
                        <div className="event-card__detail-title-top-botom">{item.title}</div>
                        <div className="event-card__detail-subtitle-top-botom">{item.subtitle}</div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            {/* Info arriba */}
            {renderInfoList(infoTop)}

            {/* Tarjeta itinerario */}
            <div className="event-card">
                <h2 className="event-card__title">Itinerario</h2>
                <div className="event-card__details">
                    {eventDetails.map((item, index) => (
                        <div key={index} className="event-card__detail">
                            <div className="event-card__icon">{item.icon}</div>
                            <div className="event-card__text">
                                <div className="event-card__detail-title">{item.title}</div>
                                <div className="event-card__detail-subtitle">{item.subtitle}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Info abajo */}
            {renderInfoList(infoBottom)}
        </div>
    );
}

export default EventInfo;

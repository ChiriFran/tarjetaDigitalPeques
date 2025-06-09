import React from 'react';
import "../styles/HeroBackgroundDesing.css";
import centralImage from '../../media/hero/marine-fleury-dupe.jpeg';

function HeroBackgroundDesing() {
  return (
    <div className="heroBackgroundDesingContainer">
      <div className="heroBackgroundDesingMask"></div>

      <div className="heroCenterImageWrapper">
        <div className="heroImageFrame">
          <img
            src={centralImage}
            alt="Decoración central"
            className="heroCenterImage"
          />
        </div>

        <div className="heroBackgroundDesingNames">
          <h2>Baby Shower</h2>
          <p className='fecha'>16 Junio 2025</p>
          <p className='direccion'>San Martin 123 Barrio Oeste</p>
        </div>

        <div className="confirmarAsistencia">
          <span className='flechaAbajoText'>¡Confirma tu asistencia!</span>
          <img className='flechaAbajoImg' src="../../media/icons/flecha-abajo.webp" alt="confirmacion abajo" />
        </div>
      </div>
    </div>
  );
}

export default HeroBackgroundDesing;

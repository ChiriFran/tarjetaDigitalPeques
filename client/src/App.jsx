import './App.css';
import { useRef, useState } from 'react';
import PasswordOverlay from './components/PasswordOverlay';
import HeroBackgroundDesing from './components/HeroBackgroundDesing';
import AttendanceConfirmation from './components/AttendanceConfirmation';
import FadeInSection from './components/FadeInSection';

function App() {
  const musicRef = useRef();
  const attendanceRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false); // 👉 controla visibilidad

  return (
    <>
      <PasswordOverlay musicRef={musicRef} />
      <FadeInSection><HeroBackgroundDesing /></FadeInSection>

      {/* Botón para abrir el pop-up */}
      <div className="attendance-button-container">
        <button className="attendance-button" onClick={() => setShowPopup(true)}>
          Confirmar asistencia
        </button>
      </div>


      {/* Pop-up con fondo y formulario */}
      {showPopup && (
        <div className="attendance-popup-overlay">
          <div className="attendance-popup-content">
            <AttendanceConfirmation onClose={() => setShowPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

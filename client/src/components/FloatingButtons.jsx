import '../styles/FloatingButtons.css';
import MusicPlayerButton from './MusicPlayerButton'; // Asumo que tienes este componente
import CTAButton from './CTAButton'; // El botón para confirmar asistencia

const FloatingButtons = ({ attendanceRef, musicRef }) => (
  <div className="floating-buttons">
    <CTAButton />
    <MusicPlayerButton ref={musicRef} />
  </div>
);



export default FloatingButtons;

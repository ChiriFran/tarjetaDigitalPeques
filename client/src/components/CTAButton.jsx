import '../styles/FloatingButtons.css';

const CTAButton = () => {
  const scrollToAttendance = () => {
    const section = document.getElementById('attendance-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className="cta-button" onClick={scrollToAttendance}>
      Confirmar asistencia
    </button>
  );
};

export default CTAButton;

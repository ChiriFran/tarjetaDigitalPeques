import './App.css';
import { useRef } from 'react';
import PasswordOverlay from './components/PasswordOverlay';
import HeroBackgroundDesing from './components/HeroBackgroundDesing';
import AttendanceConfirmation from './components/AttendanceConfirmation';
import FadeInSection from './components/FadeInSection';

function App() {
  const musicRef = useRef();
  // 🎯 Referencia para scrollear
  const attendanceRef = useRef(null);

  return (
    <>
      <PasswordOverlay musicRef={musicRef} />
      <FadeInSection><HeroBackgroundDesing /></FadeInSection>
      <FadeInSection><AttendanceConfirmation /></FadeInSection>

    </>
  );
}

export default App;

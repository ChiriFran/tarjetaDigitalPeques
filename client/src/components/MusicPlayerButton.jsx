import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import '../styles/FloatingButtons.css';
import playIcon from '../../media/icons/play.webp';
import pauseIcon from '../../media/icons/pause.webp';
import song from '../../media/song/cancion-de-fondo.mp3';

const MusicPlayerButton = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => { });
        setIsPlaying(true);
      }
    },
    stopMusic: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={song} loop />
      <button className="music-button" onClick={togglePlay}>
        <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
      </button>
    </>
  );
});

export default MusicPlayerButton;

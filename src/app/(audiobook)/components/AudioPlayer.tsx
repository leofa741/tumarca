'use client';

import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '../lib/tts-utils';

interface AudioPlayerProps {
  audioUrl: string;
  darkMode: boolean;
}

export default function AudioPlayer({ audioUrl, darkMode }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const togglePlay = () => setIsPlaying(!audio.paused);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', togglePlay);
    audio.addEventListener('pause', togglePlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', togglePlay);
      audio.removeEventListener('pause', togglePlay);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    }
  };

  return (
    <div className={`rounded-xl p-4 ${
      darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
    }`}>
      <audio ref={audioRef} src={audioUrl} preload="auto" className="hidden" />
      
      {/* Waveform visual (simplificado) */}
      <div className="h-12 mb-4 flex items-end gap-0.5 justify-center">
        {Array.from({ length: 40 }).map((_, i) => {
          const progress = currentTime / duration;
          const isActive = i / 40 < progress;
          const height = Math.random() * 60 + 20;
          return (
            <div
              key={i}
              className={`w-1 rounded-t transition-all duration-100 ${
                isActive 
                  ? 'bg-gradient-to-t from-amber-500 to-purple-500' 
                  : darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Controles principales */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => skip(-10)}
          className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
          }`}
          title="Retroceder 10s"
        >
          ⏪
        </button>
        
        <button
          onClick={togglePlay}
          disabled={!isLoaded}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
            !isLoaded 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-amber-500 to-purple-600 hover:scale-105 text-white shadow-lg'
          }`}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <button
          onClick={() => skip(10)}
          className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
          }`}
          title="Avanzar 10s"
        >
          ⏩
        </button>

        {/* Tiempo */}
        <div className={`flex-1 text-sm font-mono ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {formatDuration(currentTime)} / {formatDuration(duration || 0)}
        </div>
      </div>

      {/* Seek bar */}
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={currentTime}
        onChange={handleSeek}
        disabled={!isLoaded}
        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-3 disabled:opacity-50"
      />

      {/* Volumen */}
      <div className="flex items-center gap-2">
        <span className="text-sm">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolume}
          className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <span className="text-xs font-mono w-8">{Math.round(volume * 100)}%</span>
      </div>

      {/* Estado */}
      {!isLoaded && (
        <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Cargando audio...
        </p>
      )}
    </div>
  );
}
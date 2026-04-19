'use client';

interface DownloadButtonProps {
  audioUrl: string;
  darkMode: boolean;
  filename?: string;
}

export default function DownloadButton({ 
  audioUrl, 
  darkMode, 
  filename 
}: DownloadButtonProps) {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = filename || `audiobook-${new Date().toISOString().split('T')[0]}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
        darkMode
          ? 'bg-gray-700 hover:bg-gray-600 text-white'
          : 'bg-gray-900 hover:bg-gray-800 text-white'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      📥 Descargar MP3
    </button>
  );
}
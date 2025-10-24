import React, { useState, useEffect } from 'react';

// Beri tahu TypeScript tentang pustaka jspdf yang dimuat secara global
declare const window: any;


interface LetterDisplayProps {
  letter: string;
  error: string | null;
  onReset: () => void;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({ letter, error, onReset }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
  };
  
  const handleDownloadTxt = () => {
    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'surat_sekolah.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadPdf = () => {
    if (!letter) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = pageWidth - margin * 2;

    const lines = doc.splitTextToSize(letter, textWidth);
    
    doc.text(lines, margin, margin);
    doc.save('surat_sekolah.pdf');
  };
  
  const handleOpenGoogleDocs = () => {
    if (!letter) return;
    const title = encodeURIComponent('Surat Sekolah');
    const body = encodeURIComponent(letter);
    const url = `https://docs.google.com/document/create?title=${title}&body=${body}`;
    window.open(url, '_blank');
  };


  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700">Terjadi Kesalahan</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      );
    }

    if (!letter) {
      return (
        <div className="text-center p-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2Z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Hasil Surat Akan Tampil di Sini</h3>
            <p className="mt-1 text-sm text-gray-500">Isi formulir di samping dan klik "Buat Surat".</p>
        </div>
      );
    }

    return (
      <div className="relative">
        <div id="printable-area" className="bg-white p-6 border border-gray-200 rounded-lg shadow-inner">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
            {letter}
          </pre>
        </div>
        <div className="sticky bottom-4 w-full flex justify-center mt-4">
          <div className="flex flex-wrap justify-center items-center gap-2 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
             <button
              onClick={() => window.print()}
              title="Cetak Surat"
              className="flex items-center gap-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6 3.125A2.25 2.25 0 0 1 8.25 1h7.5A2.25 2.25 0 0 1 18 3.125l-1.969 9.844m-10.56 0a22.923 22.923 0 0 1-1.621 6.32 2.25 2.25 0 0 0 2.13 3.085h9.75a2.25 2.25 0 0 0 2.13-3.085c-.5-1.921-1.054-3.842-1.621-6.32M3 16.065h18" /></svg>
              <span className="hidden sm:inline">Cetak</span>
            </button>
             <button
              onClick={handleDownloadPdf}
              title="Download sebagai PDF"
              className="flex items-center gap-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handleOpenGoogleDocs}
              title="Buka di Google Docs"
              className="flex items-center gap-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
              <span className="hidden sm:inline">GDocs</span>
            </button>
             <button
              onClick={handleDownloadTxt}
              title="Download sebagai .txt"
              className="flex items-center gap-2 bg-teal-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              <span className="hidden sm:inline">TXT</span>
            </button>
            <button
              onClick={handleCopy}
              title="Salin Teks"
              className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  <span className="hidden sm:inline">Tersalin!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25H9m6.666 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2Z" /></svg>
                  <span className="hidden sm:inline">Salin</span>
                </>
              )}
            </button>
            <button
              onClick={onReset}
              title="Buat Surat Baru"
              className="flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.21.47-.364.74-.466l.275-.1a2.25 2.25 0 012.121 2.121l-.1.275c-.102.27-.256.53-.466.74l-6.375 6.374a1.125 1.125 0 01-1.589 0z" /></svg>
              <span className="hidden sm:inline">Baru</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50 rounded-xl p-4 lg:p-6 overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default LetterDisplay;
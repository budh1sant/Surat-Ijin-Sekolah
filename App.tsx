import React, { useState, useCallback } from 'react';
import LetterForm from './components/LetterForm';
import LetterDisplay from './components/LetterDisplay';
import { generateSchoolLetter } from './services/geminiService';
import type { LetterData } from './types';
import { LetterType } from './types';

const App: React.FC = () => {
  const initialFormData: LetterData = {
    letterType: LetterType.IZIN_SAKIT,
    studentName: '',
    studentClass: '',
    parentName: '',
    parentSignature: '',
    teacherName: '',
    schoolName: '',
    location: '',
    date: '',
    body: '',
  };

  const [formData, setFormData] = useState<LetterData>(initialFormData);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedLetter('');

    try {
      const letter = await generateSchoolLetter(formData);
      setGeneratedLetter(letter);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setGeneratedLetter('');
    setError(null);
    setIsLoading(false);
  }, [initialFormData]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Generator Surat Sekolah Cerdas</h1>
                <p className="text-sm text-gray-500">Buat surat sekolah formal dengan cepat dan mudah.</p>
            </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0">
            {/* Form Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Isi Detail Surat</h2>
              <LetterForm 
                formData={formData} 
                setFormData={setFormData}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />
            </div>
            
            {/* Display Section */}
            <div className="h-[calc(100vh-200px)] lg:h-auto min-h-[500px]">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Hasil Surat</h2>
                <div className="flex-grow">
                  <LetterDisplay 
                    letter={generatedLetter}
                    error={error}
                    onReset={handleReset}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
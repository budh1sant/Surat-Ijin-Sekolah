import React from 'react';
import type { LetterData } from '../types';
import { LetterType } from '../types';
import { LETTER_TYPES } from '../constants';
import Input from './common/Input';
import Select from './common/Select';
import Textarea from './common/Textarea';
import LoadingSpinner from './common/LoadingSpinner';

interface LetterFormProps {
  formData: LetterData;
  setFormData: React.Dispatch<React.SetStateAction<LetterData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const LetterForm: React.FC<LetterFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Select
        label="Jenis Surat"
        id="letterType"
        name="letterType"
        value={formData.letterType}
        onChange={handleChange}
        options={LETTER_TYPES}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nama Siswa"
          id="studentName"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Contoh: Budi Santoso"
          required
        />
        <Input
          label="Kelas"
          id="studentClass"
          name="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          placeholder="Contoh: 6A"
          required
        />
      </div>
       <Input
        label="Nama Orang Tua/Wali"
        id="parentName"
        name="parentName"
        value={formData.parentName}
        onChange={handleChange}
        placeholder="Contoh: Ahmad Santoso"
        required
      />
      <Input
        label="Tanda Tangan (Nama Jelas Orang Tua/Wali)"
        id="parentSignature"
        name="parentSignature"
        value={formData.parentSignature}
        onChange={handleChange}
        placeholder="Nama yang akan tercetak di bawah"
        required
      />
      <Input
        label="Nama Wali Kelas"
        id="teacherName"
        name="teacherName"
        value={formData.teacherName}
        onChange={handleChange}
        placeholder="Contoh: Ibu Indah Permatasari"
        required
      />
      <Input
        label="Nama Sekolah"
        id="schoolName"
        name="schoolName"
        value={formData.schoolName}
        onChange={handleChange}
        placeholder="Contoh: SDN 1 Cerdas"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Lokasi Pembuatan Surat"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Contoh: Jakarta"
          required
        />
        <Input
          label="Tanggal (untuk Izin)"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
        />
      </div>
      <Textarea
        label="Isi/Alasan Tambahan"
        id="body"
        name="body"
        value={formData.body}
        onChange={handleChange}
        placeholder="Jelaskan alasan Anda secara singkat di sini. Misal: karena ada kepentingan keluarga yang tidak bisa ditinggalkan."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Membuat Surat...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <span>Buat Surat</span>
          </>
        )}
      </button>
    </form>
  );
};

export default LetterForm;
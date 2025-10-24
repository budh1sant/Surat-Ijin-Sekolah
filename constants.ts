import { LetterType } from './types';

export const LETTER_TYPES = [
  { value: LetterType.IZIN_SAKIT, label: "Surat Izin Sakit" },
  { value: LetterType.IZIN_ACARA_KELUARGA, label: "Surat Izin Acara Keluarga" },
  // Fix: Corrected enum member to match its definition in `types.ts`.
  { value: LetterType.PERMOHOHAN_SURAT_KETERANGAN, label: "Permohonan Surat Keterangan Siswa" },
  { value: LetterType.SURAT_REKOMENDASI, label: "Permohonan Surat Rekomendasi" },
  { value: LetterType.LAINNYA, label: "Lainnya (Jelaskan)" },
];
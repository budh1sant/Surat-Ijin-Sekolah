export enum LetterType {
  IZIN_SAKIT = "Surat Izin Sakit",
  IZIN_ACARA_KELUARGA = "Surat Izin Acara Keluarga",
  PERMOHOHAN_SURAT_KETERANGAN = "Permohonan Surat Keterangan Siswa Aktif",
  SURAT_REKOMENDASI = "Permohonan Surat Rekomendasi",
  LAINNYA = "Lainnya",
}

export interface LetterData {
  letterType: LetterType;
  studentName: string;
  studentClass: string;
  parentName: string;
  parentSignature: string;
  teacherName: string;
  schoolName: string;
  location: string;
  date: string;
  body: string;
}
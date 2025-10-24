import { GoogleGenAI } from "@google/genai";
import type { LetterData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateSchoolLetter = async (formData: LetterData): Promise<string> => {
  const prompt = `
    Anda adalah asisten ahli dalam menulis surat resmi untuk keperluan sekolah dalam Bahasa Indonesia. 
    Berdasarkan informasi berikut, buatlah sebuah surat yang formal, sopan, dan jelas.

    Jenis Surat: ${formData.letterType}
    Nama Siswa: ${formData.studentName}
    Kelas: ${formData.studentClass}
    Nama Orang Tua/Wali: ${formData.parentName}
    Nama Jelas untuk Tanda Tangan: ${formData.parentSignature}
    Nama Wali Kelas: ${formData.teacherName}
    Nama Sekolah: ${formData.schoolName}
    Lokasi Pembuatan Surat: ${formData.location}
    Tanggal Kejadian (jika relevan, misal untuk izin): ${formData.date}
    Isi/Alasan Tambahan: ${formData.body}

    Instruksi Penting:
    1.  Gunakan format surat resmi Indonesia yang baku.
    2.  Sertakan tempat dan tanggal penulisan surat di pojok kanan atas. Gunakan lokasi yang diberikan. Contoh: ${formData.location}, 17 Agustus 2024.
    3.  Tujukan surat kepada pihak yang relevan (misalnya, Yth. Bapak/Ibu Wali Kelas ${formData.teacherName}).
    4.  Gunakan salam pembuka formal seperti "Dengan hormat,".
    5.  Isi surat harus jelas, ringkas, dan sesuai dengan jenis surat yang diminta.
    6.  Gunakan salam penutup formal seperti "Atas perhatian Bapak/Ibu, saya ucapkan terima kasih."
    7.  Akhiri dengan "Hormat saya," diikuti beberapa baris kosong untuk tanda tangan, lalu nama jelas dari 'Nama Jelas untuk Tanda Tangan'.
    8.  Jika tanggal kejadian tidak diisi, jangan sebutkan tanggal secara spesifik dalam isi surat.
    9.  Jangan menambahkan komentar atau penjelasan di luar isi surat. Hasilkan hanya teks suratnya saja.

    Berikut adalah contoh struktur:
    ${formData.location}, [Tanggal Hari Ini]

    Yth. Bapak/Ibu ${formData.teacherName}
    Wali Kelas ${formData.studentClass}
    di ${formData.schoolName}

    Dengan hormat,
    Saya yang bertanda tangan di bawah ini:
    Nama: ${formData.parentName}
    Orang Tua/Wali dari:
    Nama: ${formData.studentName}
    Kelas: ${formData.studentClass}

    [Isi surat sesuai dengan jenis surat dan alasan yang diberikan]

    Demikian surat ini saya sampaikan. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.

    Hormat saya,




    ${formData.parentSignature}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating letter:", error);
    throw new Error("Gagal membuat surat. Silakan coba lagi.");
  }
};
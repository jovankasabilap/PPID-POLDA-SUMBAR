export interface DokumenItem {
  title: string
  description: string
  fileUrl: string
}

export const dokumen: DokumenItem[] = [
  {
    title: "Laporan Kinerja Tahunan",
    description: "Ringkasan kinerja tahunan Polda Sumbar",
    fileUrl: "/dokumen/laporan-kinerja.pdf",
  },
  {
    title: "Anggaran dan Realisasi",
    description: "Transparansi anggaran dan penggunaannya",
    fileUrl: "/dokumen/anggaran.pdf",
  },
  {
    title: "Struktur Organisasi",
    description: "Struktur organisasi dan unit kerja",
    fileUrl: "/dokumen/struktur-organisasi.pdf",
  },
  

]

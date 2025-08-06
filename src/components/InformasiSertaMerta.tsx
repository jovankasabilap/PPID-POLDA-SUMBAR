import React, { useState, useRef, useEffect } from "react"
import { ArrowLeft, AlertTriangle, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Informasi {
  _id: string
  judul: string
  isi: string
  kategori: string
  dibuatPada: string
}

export default function InformasiSertaMerta() {
  const navigate = useNavigate()
  const detailRef = useRef<HTMLDivElement | null>(null)

  const [data, setData] = useState<Informasi[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState<Informasi | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/informasi")
      const result = await res.json()
      const filtered = result.filter((item: Informasi) => item.kategori === "Serta Merta")
      setData(filtered)
      setLoading(false)
    } catch (err) {
      console.error("Gagal mengambil data:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedInfo && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedInfo])

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100 py-10 px-4 md:px-16 lg:px-32">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-red-700 hover:underline mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-base font-medium">Kembali</span>
      </button>

      {/* Judul Halaman */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Informasi Serta Merta
      </h1>
      <p className="text-gray-600 mb-10 text-lg max-w-2xl">
        Informasi serta-merta adalah informasi yang wajib diumumkan dengan segera oleh Polda Sumatera Barat karena dapat mengancam hajat hidup orang banyak dan ketertiban umum.
      </p>

      {/* Loading / Empty State */}
      {loading ? (
        <p className="text-gray-500">Memuat informasi...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Belum ada data informasi serta merta.</p>
      ) : (
        <>
          {/* Daftar Informasi */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
            {data.map((item) => (
              <button
                key={item._id}
                onClick={() => setSelectedInfo(item)}
                className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-red-50 transition cursor-pointer group"
              >
                <div className="bg-red-100 text-red-600 rounded-full p-2">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 group-hover:text-red-700 font-medium">
                  {item.judul}
                </span>
              </button>
            ))}
          </div>

          {/* Panel Informasi Terpilih */}
          {selectedInfo && (
            <div
              ref={detailRef}
              className="bg-white border-l-4 border-red-600 shadow-md rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Info className="text-red-600 w-5 h-5" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedInfo.judul}
                </h2>
              </div>
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                {selectedInfo.isi}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

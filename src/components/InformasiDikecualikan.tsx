import React, { useState, useRef, useEffect } from "react"
import { ArrowLeft, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Informasi {
  _id: string
  judul: string
  isi: string
  kategori: string
  dibuatPada: string
}

export default function InformasiDikecualikan() {
  const navigate = useNavigate()
  const detailRef = useRef<HTMLDivElement | null>(null)

  const [data, setData] = useState<Informasi[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState<Informasi | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/informasi")
      const result = await res.json()
      const filtered = result.filter((item: Informasi) => item.kategori === "Dikecualikan")
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 md:px-16 lg:px-32">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:underline mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-base font-medium">Kembali</span>
      </button>

      {/* Judul Halaman */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Informasi yang Dikecualikan
      </h1>
      <p className="text-gray-600 mb-10 text-lg max-w-3xl">
        Informasi dikecualikan adalah informasi yang tidak dapat diakses oleh publik sesuai dengan ketentuan peraturan perundang-undangan karena berpotensi mengganggu kepentingan tertentu seperti keamanan negara, privasi, atau proses hukum.
      </p>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500">Memuat informasi...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Belum ada data informasi dikecualikan.</p>
      ) : (
        <>
          {/* Daftar Informasi */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
            {data.map((item) => (
              <button
                key={item._id}
                onClick={() => setSelectedInfo(item)}
                className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-gray-100 transition cursor-pointer group"
              >
                <div className="bg-gray-200 text-gray-700 rounded-full p-2">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 group-hover:text-gray-900 font-medium">
                  {item.judul}
                </span>
              </button>
            ))}
          </div>

          {/* Panel Deskripsi */}
          {selectedInfo && (
            <div
              ref={detailRef}
              className="bg-white border-l-4 border-gray-600 shadow-md rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="text-gray-600 w-5 h-5" />
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

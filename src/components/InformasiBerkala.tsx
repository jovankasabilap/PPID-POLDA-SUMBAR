import React, { useEffect, useRef, useState } from "react"
import { ArrowLeft, FileText, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Informasi {
  _id: string
  judul: string
  isi: string
  kategori: string
  dibuatPada: string
}

export default function InformasiBerkala() {
  const detailRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const [data, setData] = useState<Informasi[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInfo, setSelectedInfo] = useState<Informasi | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/informasi")
      const result = await response.json()
      const berkalaOnly = result.filter((info: Informasi) => info.kategori === "Berkala")
      setData(berkalaOnly)
      setLoading(false)
    } catch (err) {
      console.error("Gagal mengambil data:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = (item: Informasi) => {
    setSelectedInfo(item)
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10 px-4 md:px-16 lg:px-32">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-700 hover:underline mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-base font-medium">Kembali</span>
      </button>

      <h1 className="text-4xl font-bold text-gray-900 mb-3">Detail Informasi Berkala</h1>
      <p className="text-gray-600 mb-10 text-lg max-w-2xl">
        Informasi berkala adalah informasi yang wajib diumumkan secara rutin oleh Polda Sumatera Barat untuk menjamin transparansi kepada masyarakat.
      </p>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500">Memuat informasi berkala...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Belum ada informasi berkala tersedia.</p>
      ) : (
        <>
          {/* Daftar Informasi */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 mb-10">
            {data.map((item) => (
              <button
                key={item._id}
                onClick={() => handleClick(item)}
                className="w-full text-left flex items-center space-x-3 p-4 rounded-md hover:bg-blue-50 transition cursor-pointer group"
              >
                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-lg text-gray-800 group-hover:text-blue-700 font-medium">
                  {item.judul}
                </span>
              </button>
            ))}
          </div>

          {/* Panel Informasi Terpilih */}
          {selectedInfo && (
            <div
              ref={detailRef}
              className="bg-white border-l-4 border-blue-600 shadow-md rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Info className="text-blue-600 w-5 h-5" />
                <h2 className="text-2xl font-semibold text-gray-800">{selectedInfo.judul}</h2>
              </div>

              <pre className="whitespace-pre-line text-gray-700 text-base leading-relaxed text-justify">
                {selectedInfo.isi}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  )
}

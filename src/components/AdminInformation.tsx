import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotateCcw } from "lucide-react"
import FormAdminInformation from "./FormAdminInformation"

interface Informasi {
  _id: string
  judul: string
  isi: string
  kategori: string
  dibuatPada: string
}

export default function AdminInformation() {
  const [data, setData] = useState<Informasi[]>([])
  const [loading, setLoading] = useState(true)
  const [editData, setEditData] = useState<Informasi | null>(null)
  const navigate = useNavigate() // ← Tambahan: untuk tombol kembali

  const fetchInformasi = () => {
    setLoading(true)
    fetch("http://localhost:5000/api/informasi")
      .then((res) => res.json())
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err)
        setLoading(false)
      })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus informasi ini?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/informasi/${id}`, {
          method: "DELETE",
        })
        if (res.ok) {
          fetchInformasi()
        } else {
          const error = await res.json()
          console.error("Gagal menghapus:", error)
          alert("Gagal menghapus data: " + error.message)
        }
      } catch (err) {
        console.error("Gagal:", err)
        alert("Terjadi kesalahan saat menghapus data.")
      }
    }
  }

  const handleEdit = (item: Informasi) => {
    setEditData(item)
  }

  useEffect(() => {
    fetchInformasi()
  }, [])

  return (
    <div className="p-6">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        ← Kembali ke Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Informasi</h1>
        <button
          onClick={fetchInformasi}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <RotateCcw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Form Tambah/Edit */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          {editData ? "Edit Informasi" : "Tambah Informasi"}
        </h2>
        <FormAdminInformation
          onSuccess={() => {
            fetchInformasi()
            setEditData(null)
          }}
          editData={editData}
          onCancelEdit={() => setEditData(null)}
        />
      </div>

      {/* Tabel Data */}
      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Tidak ada data informasi ditemukan.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Judul</th>
                <th className="px-4 py-3 border">Deskripsi</th>
                <th className="px-4 py-3 border">Kategori</th>
                <th className="px-4 py-3 border">Waktu</th>
                <th className="px-4 py-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((info) => (
                <tr key={info._id} className="border-t hover:bg-blue-50">
                  <td className="px-4 py-2">{info.judul}</td>
                  <td className="px-4 py-2">{info.isi}</td>
                  <td className="px-4 py-2">{info.kategori}</td>
                  <td className="px-4 py-2">
                    {new Date(info.dibuatPada).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(info)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(info._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

import axios from "axios"
import { useState, useEffect } from "react"

interface Informasi {
  _id?: string
  judul: string
  isi: string
  kategori: string
}

interface FormAdminInformationProps {
  onSuccess: () => void
  editData?: Informasi | null
  onCancelEdit?: () => void
}

export default function FormAdminInformation({
  onSuccess,
  editData,
  onCancelEdit,
}: FormAdminInformationProps) {
  const [judul, setJudul] = useState("")
  const [isi, setIsi] = useState("")
  const [kategori, setKategori] = useState("")
  const [loading, setLoading] = useState(false)

  // Isi form otomatis jika sedang dalam mode edit
  useEffect(() => {
    if (editData) {
      setJudul(editData.judul)
      setIsi(editData.isi)
      setKategori(editData.kategori)
    } else {
      setJudul("")
      setIsi("")
      setKategori("")
    }
  }, [editData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editData?._id) {
        // Mode edit: update informasi
        await axios.put(`http://localhost:5000/api/informasi/${editData._id}`, {
          judul,
          isi,
          kategori,
        })
        alert("✅ Informasi berhasil diperbarui!")
      } else {
        // Mode tambah baru
        await axios.post("http://localhost:5000/api/informasi", {
          judul,
          isi,
          kategori,
        })
        alert("✅ Informasi berhasil ditambahkan!")
      }

      // Reset form dan reload data
      setJudul("")
      setIsi("")
      setKategori("")
      onSuccess()
      if (onCancelEdit) onCancelEdit()
    } catch (error) {
      console.error("Gagal menyimpan informasi:", error)
      alert("❌ Gagal menyimpan informasi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        placeholder="Isi informasi"
        className="border p-2 w-full rounded"
        required
        rows={4}
      />
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Pilih Kategori</option>
        <option value="Berkala">Informasi Berkala</option>
        <option value="Serta Merta">Informasi Serta Merta</option>
        <option value="Setiap Saat">Informasi Setiap Saat</option>
        <option value="Dikecualikan">Informasi Dikecualikan</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded transition`}
        >
          {loading ? "Menyimpan..." : editData ? "Update" : "Simpan"}
        </button>
        {editData && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

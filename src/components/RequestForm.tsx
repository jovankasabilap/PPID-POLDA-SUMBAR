import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select } from "../components/ui/select"
import { FileText, Send } from 'lucide-react'

interface RequestFormProps {
  onSubmit?: (data: {
    name: string
    email: string
    phone: string
    address: string
    category: string
    subject: string
    description: string
    purpose: string
  }) => void
}

export default function RequestForm({ onSubmit }: RequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    subject: "",
    description: "",
    purpose: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        const response = await fetch("http://localhost:5000/api/request/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          throw new Error("Gagal mengirim permohonan")
        }

        alert("Permohonan Anda telah dikirim. Kami akan memproses dalam 1x24 jam.")
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        category: "",
        subject: "",
        description: "",
        purpose: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      subject: "",
      description: "",
      purpose: "",
    })
  }

  return (
    <section id="permohonan" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight drop-shadow">Formulir Permohonan Informasi</h2>
          <p className="text-xl text-gray-600 whitespace-nowrap mx-auto">
            Ajukan permohonan informasi publik dengan mengisi formulir di bawah ini secara lengkap.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border border-blue-200 rounded-3xl bg-white/90 backdrop-blur">
            <CardHeader className="bg-blue-100 rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-700 rounded-xl flex items-center justify-center shadow">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-blue-900 font-semibold">Permohonan Informasi Publik</CardTitle>
                  <CardDescription className="text-gray-700">
                    Lengkapi data berikut untuk mengajukan permohonan informasi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="rounded-b-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Informasi *</Label>
                    <Select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      required
                    >
                      <option value="">Pilih kategori informasi</option>
                      <option value="berkala">Informasi Berkala</option>
                      <option value="serta-merta">Informasi Serta Merta</option>
                      <option value="setiap-saat">Informasi Setiap Saat</option>
                      <option value="lainnya">Lainnya</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Judul Permohonan *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Ringkasan informasi yang diminta"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Rincian Informasi yang Diminta *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Jelaskan secara detail informasi yang Anda butuhkan"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Tujuan Penggunaan Informasi *</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    placeholder="Jelaskan tujuan penggunaan informasi yang diminta"
                    rows={3}
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Catatan Penting:</h4>
                  <ul className="text-sm text-blue-800 list-disc pl-5 space-y-1">
                    <li>Permohonan akan diproses maksimal 10 hari kerja</li>
                    <li>Informasi yang dikecualikan tidak dapat diberikan</li>
                    <li>Pemohon akan dihubungi melalui email/telepon yang terdaftar</li>
                    <li>Pastikan data yang diisi sudah benar dan lengkap</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting}>
                    Reset Form
                  </Button>
                  <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white shadow-md" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Mengirim...' : 'Kirim Permohonan'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
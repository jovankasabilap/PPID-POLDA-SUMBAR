"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import {
  Calendar,
  Clock,
  Search,
  Eye,
  ArrowRight,
  Megaphone,
  AlertCircle,
  FileText,
} from "lucide-react"

export default function News() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedNews, setSelectedNews] = useState<typeof newsData[0] | null>(null)

  const newsData = [
    {
      id: 1,
      title: "Peluncuran Sistem PPID Online Terbaru",
      excerpt:
        "PPID Polda Sumbar meluncurkan sistem online terbaru untuk mempermudah akses informasi publik bagi masyarakat.",
      content:
        "Dalam rangka meningkatkan pelayanan informasi publik, PPID Polda Sumatera Barat dengan bangga mengumumkan peluncuran sistem online terbaru. Sistem ini dilengkapi dengan fitur-fitur canggih yang memungkinkan masyarakat untuk mengajukan permohonan informasi dengan lebih mudah dan cepat...",
      category: "pengumuman",
      date: "2024-01-15",
      time: "10:30",
      views: 245,
      image: "/peluncuran.jpeg?height=200&width=400",
      author: "Admin PPID",
      tags: ["teknologi", "pelayanan", "online"],
    },
    {
      id: 2,
      title: "Sosialisasi UU Keterbukaan Informasi Publik",
      excerpt:
        "Kegiatan sosialisasi UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik kepada masyarakat Sumbar.",
      content:
        "PPID Polda Sumatera Barat mengadakan kegiatan sosialisasi Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Kegiatan ini bertujuan untuk meningkatkan pemahaman masyarakat tentang hak-hak mereka dalam mengakses informasi publik...",
      category: "kegiatan",
      date: "2024-01-12",
      time: "14:00",
      views: 189,
      image: "/sosialisasi.jpg?height=200&width=400",
      author: "Tim Sosialisasi",
      tags: ["sosialisasi", "UU", "masyarakat"],
    },
    {
      id: 3,
      title: "Peningkatan Keamanan Data Pemohon",
      excerpt:
        "Implementasi sistem keamanan berlapis untuk melindungi data pribadi pemohon informasi.",
      content:
        "Dalam komitmen untuk melindungi privasi dan keamanan data pemohon, PPID Polda Sumbar telah mengimplementasikan sistem keamanan berlapis. Sistem ini menggunakan enkripsi tingkat tinggi dan protokol keamanan internasional...",
      category: "pengumuman",
      date: "2024-01-10",
      time: "09:15",
      views: 156,
      image: "/keamanan_data.jpeg?height=200&width=400",
      author: "Tim IT",
      tags: ["keamanan", "data", "privasi"],
    },
    {
      id: 4,
      title: "Workshop Pengelolaan Dokumen Digital",
      excerpt:
        "Pelatihan untuk petugas PPID dalam pengelolaan dan digitalisasi dokumen informasi publik.",
      content:
        "PPID Polda Sumatera Barat mengadakan workshop pengelolaan dokumen digital untuk meningkatkan kapasitas petugas dalam mengelola informasi publik. Workshop ini mencakup teknik digitalisasi, pengarsipan digital, dan sistem manajemen dokumen...",
      category: "kegiatan",
      date: "2024-01-08",
      time: "08:30",
      views: 134,
      image: "/workshop.jpeg?height=200&width=400",
      author: "Tim Pelatihan",
      tags: ["workshop", "digital", "dokumen"],
    },
    {
      id: 5,
      title: "Laporan Kinerja PPID Tahun 2023",
      excerpt:
        "Publikasi laporan kinerja PPID Polda Sumbar tahun 2023 dengan pencapaian dan evaluasi layanan.",
      content:
        "PPID Polda Sumatera Barat mempublikasikan Laporan Kinerja tahun 2023 yang menunjukkan peningkatan signifikan dalam pelayanan informasi publik. Laporan ini mencakup statistik permohonan, tingkat kepuasan masyarakat, dan rencana pengembangan ke depan...",
      category: "laporan",
      date: "2024-01-05",
      time: "16:45",
      views: 298,
      image: "/laporan.jpg?height=200&width=400",
      author: "Kepala PPID",
      tags: ["laporan", "kinerja", "2023"],
    },
    {
      id: 6,
      title: "Kerjasama dengan Universitas Negeri Padang",
      excerpt:
        "Penandatanganan MoU dengan Unand untuk penelitian transparansi informasi publik.",
      content:
        "PPID Polda Sumatera Barat menjalin kerjasama dengan Universitas Andalas melalui penandatanganan Memorandum of Understanding (MoU) untuk penelitian dan pengembangan transparansi informasi publik. Kerjasama ini akan menghasilkan inovasi-inovasi baru dalam pelayanan PPID...",
      category: "kerjasama",
      date: "2024-01-03",
      time: "11:20",
      views: 167,
      image: "/visit unp.jpg?height=200&width=400",
      author: "Humas PPID",
      tags: ["kerjasama", "universitas", "penelitian"],
    },
  ]

  const categories = [
    { id: "all", name: "Semua", icon: FileText, color: "bg-gray-500" },
    { id: "pengumuman", name: "Pengumuman", icon: Megaphone, color: "bg-blue-500" },
    { id: "kegiatan", name: "Kegiatan", icon: Calendar, color: "bg-green-500" },
    { id: "laporan", name: "Laporan", icon: FileText, color: "bg-purple-500" },
    { id: "kerjasama", name: "Kerjasama", icon: AlertCircle, color: "bg-orange-500" },
  ]

  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (selectedNews) {
    return (
      <section id="berita" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button onClick={() => setSelectedNews(null)} variant="outline" className="mb-8">
              ← Kembali ke Berita
            </Button>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={selectedNews.image || "/placeholder.svg"}
                alt={selectedNews.title}
                className="w-full max-h-[400px] sm:max-h-[500px] object-cover rounded-t-lg"
              />

              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className={`${categories.find((c) => c.id === selectedNews.category)?.color} text-white`}>
                    {categories.find((c) => c.id === selectedNews.category)?.name}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedNews.date)}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedNews.time} WIB
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedNews.views} views
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedNews.title}</h1>

                <div className="text-gray-600 mb-6">Oleh: {selectedNews.author}</div>

                <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">{selectedNews.content}</div>

                <div className="flex flex-wrap gap-2">
                  {selectedNews.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="berita" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Berita & Pengumuman</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Informasi terkini seputar kegiatan dan pengumuman PPID Polda Sumatera Barat
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari berita atau pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category.id ? `${category.color} text-white` : "bg-transparent"}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <Card key={news.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <Badge
                  className={`absolute top-4 left-4 ${categories.find((c) => c.id === news.category)?.color} text-white`}
                >
                  {categories.find((c) => c.id === news.category)?.name}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(news.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{news.views}</span>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-gray-600 line-clamp-3 mb-4">{news.excerpt}</CardDescription>

                <div className="flex flex-wrap gap-1 mb-4">
                  {news.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <Button onClick={() => setSelectedNews(news)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>
    </section>
  )
}

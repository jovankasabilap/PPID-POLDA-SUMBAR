"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import {
  Calendar, Clock, Search, Eye, ArrowRight, Megaphone, AlertCircle, FileText
} from "lucide-react"

interface NewsItem {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  time: string
  views: number
  image: string
  author: string
  tags: string[]
}

export default function News() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  const categories = [
    { id: "all", name: "Semua", icon: FileText, color: "bg-gray-500" },
    { id: "pengumuman", name: "Pengumuman", icon: Megaphone, color: "bg-blue-500" },
    { id: "kegiatan", name: "Kegiatan", icon: Calendar, color: "bg-green-500" },
    { id: "laporan", name: "Laporan", icon: FileText, color: "bg-purple-500" },
    { id: "kerjasama", name: "Kerjasama", icon: AlertCircle, color: "bg-orange-500" },
  ]

  useEffect(() => {
    axios.get(`${ "http://localhost:5000"}/api/news`)
      .then((res) => setNewsData(res.data))
      .catch((err) => console.error("Gagal memuat berita:", err))
  }, [])

  const filteredNews = newsData.filter((news) =>
    (news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "all" || news.category.toLowerCase() === selectedCategory)
  )

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    })

  if (selectedNews) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Button onClick={() => setSelectedNews(null)} variant="outline" className="mb-8">
            ← Kembali ke Berita
          </Button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={selectedNews.image || "/placeholder.svg"} alt={selectedNews.title} className="w-full max-h-[400px] object-cover" />
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <Badge className={`${categories.find(c => c.id === selectedNews.category)?.color} text-white`}>
                  {categories.find(c => c.id === selectedNews.category)?.name}
                </Badge>
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(selectedNews.date)}
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedNews.time} WIB
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {selectedNews.views} views
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedNews.title}</h1>
              <p className="text-gray-600 mb-6">Oleh: {selectedNews.author}</p>
              <div className="prose text-gray-700 mb-8">{selectedNews.content}</div>
              <div className="flex flex-wrap gap-2">
                {selectedNews.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">#{tag}</Badge>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Berita & Pengumuman</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Informasi terkini dari PPID Polda Sumatera Barat</p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari berita atau pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className={selectedCategory === cat.id ? `${cat.color} text-white` : ""}
                size="sm"
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <Card key={news._id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
                <Badge className={`absolute top-4 left-4 ${categories.find(c => c.id === news.category)?.color} text-white`}>
                  {categories.find(c => c.id === news.category)?.name}
                </Badge>
              </div>
              <CardHeader>
                <div className="text-sm text-gray-500 flex justify-between">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(news.date)}</div>
                  <div className="flex items-center gap-1"><Eye className="w-4 h-4" /> {news.views}</div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 text-gray-600 mb-4">{news.excerpt}</CardDescription>
                <div className="flex flex-wrap gap-1 mb-4">
                  {news.tags.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">#{tag}</Badge>
                  ))}
                </div>
                <Button onClick={() => setSelectedNews(news)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">Tidak ada berita ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci atau filter kategori.</p>
          </div>
        )}
      </div>
    </section>
  )
}
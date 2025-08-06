"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { FileText, Users, Clock, Shield, Phone, Mail } from "lucide-react"
import { dokumen } from "./DataDokumen"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [totalPermohonan, setTotalPermohonan] = useState<number>(0)

  useEffect(() => {
    fetch("http://localhost:5000/api/request")
      .then((res) => res.json())
      .then((data) => {
        setTotalPermohonan(data.length)
      })
      .catch((err) => {
        console.error("Gagal memuat jumlah permohonan:", err)
      })
  }, [])

  const stats = [
    {
      icon: <FileText className="w-12 h-12 mx-auto mb-4 text-white" />,
      label: "Dokumen Tersedia",
      value: dokumen.length.toLocaleString(),
      link: "/unduhdokumen",
    },
    {
      icon: <Users className="w-12 h-12 mx-auto mb-4 text-white" />,
      label: "Total Permohonan",
      value: totalPermohonan.toLocaleString(),
      link: "/permohonan",
    },
    {
      icon: <Clock className="w-12 h-12 mx-auto mb-4 text-white" />,
      label: "Layanan Online",
      value: "24/7",
      link: "/kontak", 
    },
    {
      icon: <Shield className="w-12 h-12 mx-auto mb-4 text-white" />,
      label: "Keamanan Data",
      value: "100%",
      link: "/keamanandata",
    },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>(0751) 123456</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>ppid@poldasumbar.go.id</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Jam Layanan: Senin - Jumat, 08:00 - 16:00 WIB</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="beranda"
        className="relative text-white min-h-[88vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/polda.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-blue-900/90 z-0" />

        {/* Content */}
        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-24">
            {/* Left: Text */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                PPID POLDA <br className="hidden sm:block" />
                SUMATERA BARAT
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-xl">
                Melayani permintaan informasi publik dengan{" "}
                <span className="font-semibold text-white">transparan</span>,{" "}
                <span className="font-semibold text-white">akuntabel</span>, dan{" "}
                <span className="font-semibold text-white">profesional</span> sesuai
                <em> Undang-Undang No. 14 Tahun 2008</em>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
                  onClick={() => scrollToSection("permohonan")}
                >
                  Ajukan Permohonan
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
                  onClick={() => scrollToSection("layanan")}
                >
                  Panduan Layanan
                </Button>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((item, i) => (
                <Link to={item.link} key={i}>
                  <div
                    className="bg-[#1e3a8a]/80 hover:bg-[#1e40af]/90 border border-white/10 backdrop-blur-lg rounded-xl p-6 text-center shadow-lg transition duration-300 cursor-pointer"
                  >
                    {item.icon}
                    <h3 className="text-2xl font-bold mb-2 text-white">{item.value}</h3>
                    <p className="text-blue-100 text-sm">{item.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
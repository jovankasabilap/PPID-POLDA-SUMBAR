"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { MapPin, Phone, Mail, Clock, Globe, Users, ExternalLink, Navigation } from "lucide-react"

export default function Contact() {
  const [mapType, setMapType] = useState<"embed" | "link">("embed")

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      content: "Jl. Jenderal Sudirman No. 123, Padang, Sumatera Barat 25111",
      color: "bg-red-500",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "(0751) 123456 / (0751) 654321",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "ppid@poldasumbar.go.id",
      color: "bg-blue-500",
    },
    {
      icon: Globe,
      title: "Website",
      content: "www.poldasumbar.go.id",
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "Jam Layanan",
      content: "Senin - Jumat: 08:00 - 16:00 WIB",
      color: "bg-orange-500",
    },
    {
      icon: Users,
      title: "Media Sosial",
      content: "@poldasumbar (Instagram, Twitter, Facebook)",
      color: "bg-indigo-500",
    },
  ]

  // Koordinat untuk Polda Sumbar (contoh koordinat Padang)
  const latitude = -0.9359071495296349 
  const longitude = 100.36053122416311
  const address = "Polda Sumatera Barat, Jl. Jenderal Sudirman, Padang"

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    window.open(url, "_blank")
  }

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    window.open(url, "_blank")
  }

  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Untuk informasi lebih lanjut atau bantuan, silakan hubungi PPID Polda Sumatera Barat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mb-4`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 font-medium">{info.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Map Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Lokasi PPID Polda Sumbar</h3>
            <p className="text-gray-600">Jl. Jenderal Sudirman No. 55, Padang, Sumatera Barat</p>
          </div>

          {/* Map Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setMapType("embed")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mapType === "embed" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tampilkan Peta
              </button>
              <button
                onClick={() => setMapType("link")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mapType === "link" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tautan Peta
              </button>
            </div>
          </div>

          {mapType === "embed" ? (
            /* Embedded Google Maps */
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNTYnNTcuMSJTIDEwMMKwMjEnMTUuNSJF!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PPID Polda Sumatera Barat"
                ></iframe>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button
                  onClick={openGoogleMaps}
                  size="sm"
                  className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Buka di Maps
                </Button>
                <Button onClick={openDirections} size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                  <Navigation className="w-4 h-4 mr-1" />
                  Petunjuk Arah
                </Button>
              </div>
            </div>
          ) : (
            /* Map Links and Info */
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <span>Informasi Lokasi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Alamat Lengkap:</h4>
                      <p className="text-gray-600">Jl. Jenderal Sudirman No. 55, Padang, Sumatera Barat 25113</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Koordinat:</h4>
                      <p className="text-gray-600 font-mono text-sm">
                        {latitude}, {longitude}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Landmark Terdekat:</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Kantor Gubernur Sumbar (100m)</li>
                        <li>• Transmart Padang (1.2km)</li>
                        <li>• Universitas Negeri Padang (3km)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Actions */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-4">Akses Peta</h4>
                  <div className="space-y-3">
                    <Button onClick={openGoogleMaps} className="w-full justify-start bg-transparent" variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      Buka di Google Maps
                    </Button>
                    <Button onClick={openDirections} className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <Navigation className="w-4 h-4 mr-2" />
                      Dapatkan Petunjuk Arah
                    </Button>
                    <Button
                      onClick={() => {
                        const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`
                        window.open(wazeUrl, "_blank")
                      }}
                      className="w-full justify-start bg-purple-600 hover:bg-purple-700"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Buka di Waze
                    </Button>
                  </div>
                </div>

                {/* Transportation Info */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Transportasi Umum</h4>
                  <ul className="text-blue-800 text-sm space-y-2">
                    <li>
                      🚌 <strong>Bus Trans Padang:</strong> Halte Sudirman
                    </li>
                    <li>
                      🚕 <strong>Ojek Online:</strong> Tersedia Gojek & Grab
                    </li>
                    <li>
                      🚗 <strong>Parkir:</strong> Area parkir tersedia
                    </li>
                    <li>
                      🏥 <strong>Akses:</strong> Ramah disabilitas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </section>
  )
}

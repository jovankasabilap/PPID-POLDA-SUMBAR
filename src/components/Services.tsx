import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { FileSearch, Download, Shield } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: FileSearch,
      title: "Pencarian Informasi",
      description:
        "Cari dan akses informasi publik yang tersedia di database kami",
      link: "/pencarianinformasi",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: Download,
      title: "Unduh Dokumen",
      description:
        "Download dokumen dan berkas informasi publik yang diperlukan",
      link: "/unduhdokumen",
      gradient: "from-green-500 to-green-700",
    },
    {
      icon: Shield,
      title: "Keamanan Data",
      description: "Jaminan keamanan dan kerahasiaan data pemohon",
      link: "/keamanandata",
      gradient: "from-red-500 to-red-700",
    },
  ]

  return (
    <section id="layanan" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Layanan PPID
          </h2>
          <p className="text-xl text-gray-600 whitespace-nowrap mx-auto">
            Kami menyediakan berbagai layanan informasi publik yang mudah
            diakses dan transparan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative bg-gradient-to-br ${service.gradient} text-white shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer overflow-hidden`}
              onClick={() => (window.location.href = service.link)}
            >
              {/* Overlay transparan */}
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-xl pointer-events-none" />

              {/* Konten Card */}
              <div className="relative z-10">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="flex-shrink-0">
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-white text-opacity-80">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
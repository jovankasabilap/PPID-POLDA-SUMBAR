import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/logo_polda.png" alt="Logo Polri" className="h-16 w-12" />
              <div>
                <h3 className="text-xl font-bold">PPID POLDA SUMBAR</h3>
                <p className="text-gray-400">Pejabat Pengelola Informasi dan Dokumentasi</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Melayani permintaan informasi publik dengan transparan, akuntabel, dan profesional sesuai dengan ketentuan
              perundang-undangan yang berlaku.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/HumasPoldaSumateraBarat/"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/humaspoldasumbar?utm_source=ig_web_button_share_sheet&igsh=bm55ZHZtZnRvY2N6"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC5aH_ru0FMo7pmx3ccmgxYA"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("beranda")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("berita")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Berita
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("layanan")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Layanan PPID
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("informasi")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Informasi Publik
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("permohonan")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Permohonan Informasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("kontak")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Jl. Jenderal Sudirman No. 55
                  <br />
                  Padang, Sumatera Barat 25113
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">(0751) 123456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">ppid@poldasumbar.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 PPID Polda Sumatera Barat. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
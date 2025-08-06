import { useState } from "react"
import { Menu, X, User } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"

interface HeaderProps {
  onLoginClick?: () => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export default function Header({ onLoginClick, isLoggedIn, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      navigate(`/?scrollTo=${sectionId}`)
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: "Beranda", section: "beranda" },
    { label: "Berita", section: "berita" },
    { label: "Layanan", section: "layanan" },
    { label: "Informasi Publik", section: "informasi" },
    { label: "Permohonan", section: "permohonan" },
    { label: "Kontak", section: "kontak" },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <img src="/logo_polda.png" alt="Logo Polri" className="h-16 w-13" />
            <div>
              <h1 className="text-xl font-bold text-blue-900">PPID POLDA SUMBAR</h1>
              <p className="text-sm text-gray-600">Pejabat Pengelola Informasi dan Dokumentasi</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.label}
              </button>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={onLoginClick}>
                <User className="w-4 h-4 mr-2" />
                Login Admin
              </Button>
            )}
          </nav>

          {/* Mobile Menu */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavigation(item.section)}
                  className="text-gray-700 hover:text-blue-600 font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              {isLoggedIn ? (
                <>
                  <Button variant="outline" size="sm" className="w-fit">
                    <User className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                  <Button variant="outline" size="sm" className="w-fit" onClick={onLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-700 w-fit" onClick={onLoginClick}>
                  <User className="w-4 h-4 mr-2" />
                  Login Admin
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

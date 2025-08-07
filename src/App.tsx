// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"
import LandingPage from "./components/LandingPage"
import AdminDashboard from "./components/AdminDashboard"
import InformasiBerkala from "./components/InformasiBerkala"
import InformasiSertaMerta from "./components/InformasiSertaMerta"
import InformasiSetiapSaat from "./components/InformasiSetiapSaat"
import InformasiDikecualikan from "./components/InformasiDikecualikan"
import PencarianInformasi from "./components/PencarianInformasi"
import UnduhDokumen from "./components/UnduhDokumen"
import KeamananData from "./components/KeamananData"
import RequestForm from "./components/RequestForm"
import Contact from "./components/Contact"
import AdminInformation from "./components/AdminInformation"
import AdminDashboardNews from "./components/DashboardAdminNews"
import News from "./components/News"; 


function App() {
  return (
    <Router>
      <Routes>
        {/* ❌ Halaman admin TANPA Header & Footer */}
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* ✅ Semua halaman lain dengan Header & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="informasi-berkala" element={<InformasiBerkala />} />
          <Route path="informasi-serta-merta" element={<InformasiSertaMerta />} />
          <Route path="informasi-setiap-saat" element={<InformasiSetiapSaat />} />
          <Route path="informasi-dikecualikan" element={<InformasiDikecualikan />} />
          <Route path="pencarianinformasi" element={<PencarianInformasi />} />
          <Route path="unduhdokumen" element={<UnduhDokumen />} />
          <Route path="keamanandata" element={<KeamananData />} />
          <Route path="permohonan" element={<RequestForm />} />
          <Route path="kontak" element={<Contact />} />
          <Route path="/informasi" element={<AdminInformation />} />
          <Route path="tambah-berita" element={<AdminDashboardNews />} />
          <Route path="berita" element={<News />} />
          

        </Route>
      </Routes>
    </Router>
  )
}

export default App
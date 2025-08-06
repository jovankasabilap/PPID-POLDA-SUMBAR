import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Table, TableHeader, TableBody, TableRow,
    TableHead, TableCell
} from "../components/ui/table"
import {
    LogOut, Newspaper, Folder, RotateCcw,
    Filter, Search, Users, Clock, Info, Menu, X
} from "lucide-react"

interface RequestData {
    _id?: string
    name: string
    email: string
    phone: string
    address: string
    category: string
    subject: string
    description: string
    purpose: string
    submittedAt: string
}

// Format tanggal custom
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Invalid Date"

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const dayName = days[date.getDay()]

    const pad = (n: number) => n.toString().padStart(2, '0')

    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = pad(date.getHours())
    const minute = pad(date.getMinutes())
    const second = pad(date.getSeconds())

    return `${dayName}, ${day}-${month}-${year}, ${hour}:${minute}:${second}`
}

export default function AdminDashboard() {
    const [requests, setRequests] = useState<RequestData[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingData, setEditingData] = useState<RequestData | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()

    const fetchData = () => {
        setLoading(true)
        fetch("http://localhost:5000/api/request")
            .then(res => res.json())
            .then(data => {
                setRequests(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch requests", err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated")
        navigate("/")
    }

    const filteredRequests = requests.filter((req) => {
        const searchMatch =
            req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email.toLowerCase().includes(searchTerm.toLowerCase())
        const categoryMatch =
            selectedCategory === "" || req.category === selectedCategory
        return searchMatch && categoryMatch
    })

    const handleDelete = async (id?: string) => {
        if (!id) return
        const confirmDelete = confirm("Yakin ingin menghapus permohonan ini?")
        if (!confirmDelete) return

        try {
            const response = await fetch(`http://localhost:5000/api/request/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                fetchData()
            } else {
                alert("Gagal menghapus data.")
            }
        } catch (error) {
            console.error("Error saat menghapus:", error)
            alert("Terjadi kesalahan saat menghapus.")
        }
    }

    const handleEdit = (req: RequestData) => {
        setEditingData(req)
        setShowEditModal(true)
    }

    const handleEditSubmit = async () => {
        if (!editingData || !editingData._id) return

        try {
            const response = await fetch(`http://localhost:5000/api/request/${editingData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editingData)
            })
            if (response.ok) {
                setShowEditModal(false)
                fetchData()
            } else {
                alert("Gagal menyimpan perubahan")
            }
        } catch (err) {
            console.error(err)
            alert("Terjadi kesalahan")
        }
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans relative">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar - Better proportions */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
                w-64 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 
                text-white p-4 lg:p-6
                flex flex-col justify-between shadow-2xl
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Close button for mobile */}
                <button
                    onClick={closeSidebar}
                    className="absolute top-4 right-4 lg:hidden text-white hover:text-gray-300 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div>
                    <div className="text-center mb-6 lg:mb-8">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20">
                            <span className="text-xl lg:text-2xl">📊</span>
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold tracking-wide text-center">
                            Admin Panel
                        </h2>
                        <p className="text-sm text-blue-200 opacity-90 mt-2">
                            Dashboard Management
                        </p>
                    </div>
                    
                    <nav className="space-y-3">
                        <button 
                            onClick={closeSidebar}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 w-full text-left group border border-transparent hover:border-white/20 backdrop-blur-sm"
                        >
                            <Folder className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                            <span className="truncate font-medium">Permohonan</span>
                        </button>
                        <button
                            onClick={() => {
                                navigate("/tambah-berita")
                                closeSidebar()
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 w-full text-left group border border-transparent hover:border-white/20 backdrop-blur-sm"
                        >
                            <Newspaper className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                            <span className="truncate font-medium">Tambah Berita</span>
                        </button>
                        <button
                            onClick={() => {
                                navigate("/informasi")
                                closeSidebar()
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 w-full text-left group border border-transparent hover:border-white/20 backdrop-blur-sm"
                        >
                            <Info className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="truncate font-medium">Informasi</span>
                        </button>
                    </nav>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                    <button
                        onClick={() => {
                            handleLogout()
                            closeSidebar()
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 transition-all duration-200 w-full group border border-red-500/30 hover:border-red-400"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                        <span className="truncate font-medium">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full lg:w-auto overflow-hidden">
                {/* Header - More moderate sizing */}
                <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white shadow-xl">
                    <div className="p-4 lg:p-6">
                        <div className="flex items-center justify-between gap-6">
                            {/* Left side - Menu button and Title */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                {/* Mobile menu button */}
                                <button
                                    onClick={toggleSidebar}
                                    className="lg:hidden text-white hover:text-gray-300 hover:bg-white/10 p-3 rounded-xl transition-all flex-shrink-0 border border-white/20"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                                
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-lg leading-tight mb-2">
                                        {window.location.pathname === "/tambah-berita" 
                                            ? "Tambah Berita" 
                                            : "Permohonan Informasi Publik"
                                        }
                                    </h1>
                                    <p className="text-sm sm:text-base lg:text-lg text-blue-100 leading-relaxed opacity-90">
                                        {window.location.pathname === "/tambah-berita"
                                            ? "Form untuk menambahkan berita baru"
                                            : "Dashboard untuk mengelola data permohonan masuk"
                                        }
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right side - Stats with better proportions */}
                            <div className="text-center flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
                                <p className="text-xs lg:text-sm font-medium text-blue-100 mb-2 opacity-90">
                                    Total Permohonan
                                </p>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                                    {requests.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {window.location.pathname !== "/tambah-berita" && (
                    <>
                        {/* Stat Cards - More reasonable sizing */}
                        <section className="p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white border-b shadow-sm">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 lg:p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
                                <div className="bg-blue-600 p-3 rounded-xl shadow-md">
                                    <Users className="text-white w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-blue-800 mb-1">Total Pengguna</p>
                                    <p className="text-2xl font-bold text-blue-900">{requests.length}</p>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 lg:p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow border border-green-200">
                                <div className="bg-green-600 p-3 rounded-xl shadow-md">
                                    <Clock className="text-white w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-green-800 mb-1">Permohonan Hari Ini</p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {requests.filter(req => {
                                            const today = new Date()
                                            const submittedDate = new Date(req.submittedAt)
                                            return submittedDate.toDateString() === today.toDateString()
                                        }).length}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 lg:p-6 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow border border-yellow-200 sm:col-span-2 lg:col-span-1">
                                <div className="bg-yellow-600 p-3 rounded-xl shadow-md">
                                    <Info className="text-white w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-yellow-800 mb-1">Kategori Unik</p>
                                    <p className="text-2xl font-bold text-yellow-900">
                                        {[...new Set(requests.map(r => r.category))].length}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Filter & Search - More compact */}
                        <div className="p-4 lg:p-6 bg-white shadow-sm border-b">
                            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                                <div className="flex items-center gap-3 flex-1 lg:max-w-md">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Search className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari nama atau email..."
                                        className="flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-base transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                
                                <div className="flex items-center gap-3 flex-1 lg:max-w-md">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Filter className="w-5 h-5 text-green-600" />
                                    </div>
                                    <select
                                        className="flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-base transition-all"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Semua Kategori</option>
                                        <option value="Informasi Berkala">Informasi Berkala</option>
                                        <option value="Informasi Serta Merta">Informasi Serta Merta</option>
                                        <option value="Informasi Setiap Saat">Informasi Setiap Saat</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                
                                <button
                                    onClick={fetchData}
                                    className="flex-shrink-0 bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2 px-6 py-3 rounded-xl text-sm lg:text-base font-medium shadow-lg hover:shadow-xl"
                                >
                                    <RotateCcw className="w-4 h-4" /> 
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>

                        {/* Table - Balanced sizing */}
                        <div className="p-4 lg:p-6">
                            <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <Table className="min-w-full">
                                        <TableHeader>
                                            <TableRow className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-b-2 border-gray-300">
                                                <TableHead className="text-center whitespace-nowrap px-4 py-4 font-bold">No</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Nama</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Email</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Telepon</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Kategori</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Alamat</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Judul</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Rincian</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Tujuan</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Waktu</TableHead>
                                                <TableHead className="whitespace-nowrap px-4 py-4 font-bold">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {loading ? (
                                                <TableRow>
                                                    <TableCell colSpan={11} className="text-center py-12">
                                                        <div className="flex justify-center items-center">
                                                            <RotateCcw className="w-8 h-8 animate-spin mr-3 text-blue-600" />
                                                            <span className="text-lg text-gray-600">Memuat data...</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : filteredRequests.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={11} className="text-center py-12 text-gray-500">
                                                        <div className="text-lg">Tidak ada data yang ditemukan</div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredRequests.map((req, index) => (
                                                    <TableRow key={req._id || index} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
                                                        <TableCell className="text-center font-bold text-gray-600 px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                                                {index + 1}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[150px] lg:max-w-[200px] truncate font-medium" title={req.name}>
                                                                {req.name}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[180px] lg:max-w-[250px] truncate text-blue-600" title={req.email}>
                                                                {req.email}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5 font-mono">{req.phone}</TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[120px] lg:max-w-[160px] truncate" title={req.category}>
                                                                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                                    {req.category}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[150px] lg:max-w-[200px] truncate" title={req.address}>
                                                                {req.address}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[150px] lg:max-w-[200px] truncate font-medium" title={req.subject}>
                                                                {req.subject}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[200px] lg:max-w-[300px] truncate" title={req.description}>
                                                                {req.description}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="max-w-[150px] lg:max-w-[200px] truncate" title={req.purpose}>
                                                                {req.purpose}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5 whitespace-nowrap text-sm lg:text-base">
                                                            <div className="text-gray-600">
                                                                {formatDate(req.submittedAt)}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="px-4 py-4 lg:px-6 lg:py-5">
                                                            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                                                                <button
                                                                    onClick={() => handleEdit(req)}
                                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition-all"
                                                                >
                                                                    ✏ Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(req._id)}
                                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transition-all"
                                                                >
                                                                    🗑 Hapus
                                                                </button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                        {/* Modal Edit - Improved design */}
                        {showEditModal && editingData && (
                            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                                <div className="bg-white p-6 lg:p-8 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-200">
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                                        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-xl">
                                                ✏
                                            </div>
                                            Edit Permohonan
                                        </h2>
                                        <button
                                            onClick={() => setShowEditModal(false)}
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-all"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                            <input 
                                                type="text" 
                                                placeholder="Nama" 
                                                value={editingData.name} 
                                                onChange={(e) => setEditingData({ ...editingData, name: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input 
                                                type="email" 
                                                placeholder="Email" 
                                                value={editingData.email} 
                                                onChange={(e) => setEditingData({ ...editingData, email: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                                            <input 
                                                type="text" 
                                                placeholder="Telepon" 
                                                value={editingData.phone} 
                                                onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                                            <input 
                                                type="text" 
                                                placeholder="Alamat" 
                                                value={editingData.address} 
                                                onChange={(e) => setEditingData({ ...editingData, address: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                                            <input 
                                                type="text" 
                                                placeholder="Judul" 
                                                value={editingData.subject} 
                                                onChange={(e) => setEditingData({ ...editingData, subject: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                            <select 
                                                value={editingData.category} 
                                                onChange={(e) => setEditingData({ ...editingData, category: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            >
                                                <option value="">Pilih Kategori</option>
                                                <option value="Informasi Berkala">Informasi Berkala</option>
                                                <option value="Informasi Serta Merta">Informasi Serta Merta</option>
                                                <option value="Informasi Setiap Saat">Informasi Setiap Saat</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Rincian</label>
                                            <textarea 
                                                placeholder="Rincian" 
                                                value={editingData.description} 
                                                onChange={(e) => setEditingData({ ...editingData, description: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]" 
                                                rows={4}
                                            />
                                        </div>
                                        <div className="lg:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tujuan</label>
                                            <textarea 
                                                placeholder="Tujuan" 
                                                value={editingData.purpose} 
                                                onChange={(e) => setEditingData({ ...editingData, purpose: e.target.value })} 
                                                className="border-2 border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]" 
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-200">
                                        <button 
                                            onClick={() => setShowEditModal(false)} 
                                            className="w-full sm:w-auto px-8 py-3 lg:py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium text-lg"
                                        >
                                            Batal
                                        </button>
                                        <button 
                                            onClick={handleEditSubmit} 
                                            className="w-full sm:w-auto px-8 py-3 lg:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium text-lg shadow-lg hover:shadow-xl"
                                        >
                                            Simpan Perubahan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}
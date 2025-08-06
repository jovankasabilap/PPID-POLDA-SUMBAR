
import { ShieldCheck, LockKeyhole, UserCheck } from "lucide-react"

export default function KeamananData() {
    const points = [
        {
        icon: ShieldCheck,
        title: "Perlindungan Data Pribadi",
        description: "Kami menjaga semua data pribadi Anda sesuai dengan ketentuan perundang-undangan yang berlaku.",
        },
        {
        icon: LockKeyhole,
        title: "Keamanan Sistem Informasi",
        description: "Akses ke informasi publik dilindungi oleh sistem keamanan digital yang andal.",
        },
        {
        icon: UserCheck,
        title: "Akses Terbatas",
        description: "Hanya pihak berwenang yang memiliki akses ke informasi yang dikecualikan.",
        },
    ]

    return (
        <div className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-12 text-gray-900">Kebijakan Keamanan Data</h1>
            <div className="grid md:grid-cols-3 gap-8 text-left">
            {points.map((item, index) => (
                <div key={index} className="p-6 border rounded shadow hover:shadow-md transition">
                <div className="mb-4 text-blue-600">
                    <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}
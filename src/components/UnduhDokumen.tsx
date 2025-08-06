import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Download } from "lucide-react"
import { dokumen } from "./DataDokumen"

export default function UnduhDokumen() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-14 text-center text-indigo-800 drop-shadow-md tracking-tight">
          Unduh Dokumen Publik
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {dokumen.map((item, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 shadow-xl rounded-xl hover:shadow-2xl transform hover:scale-[1.015] transition duration-300 ease-in-out"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <a href={item.fileUrl} download>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-white hover:bg-indigo-600 border-indigo-600 transition font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Unduh PDF
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

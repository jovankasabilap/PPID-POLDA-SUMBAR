import { useEffect, useState } from "react";
import axios from "axios";

interface NewsType {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  time: string;
  author: string;
  image?: string;
  tags: string[];
}

const categories = ["Pengumuman", "Kegiatan", "Laporan", "Kerjasama"];

const DashboardAdminNews = () => {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [formData, setFormData] = useState<Omit<NewsType, "image"> & { image: File | null }>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    date: "",
    time: "",
    author: "",
    image: null,
    tags: [],
  });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNewsList(res.data);
    } catch (error) {
      console.error("Gagal mengambil berita:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setFormData({ ...formData, tags: value.split(",").map((tag) => tag.trim()) });
    } else if (name === "datetime") {
      const [date, time] = value.split("T");
      setFormData({ ...formData, date, time });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("date", formData.date);
      data.append("time", formData.time);
      data.append("author", formData.author);
      data.append("tags", JSON.stringify(formData.tags));
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/news/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/api/news", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchNews();
      resetForm();
    } catch (error) {
      console.error("Gagal mengirim berita:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      fetchNews();
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
    }
  };

  const handleEdit = (news: NewsType) => {
    setEditId(news._id || null);
    setFormData({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      category: news.category,
      date: news.date,
      time: news.time,
      author: news.author,
      image: null,
      tags: news.tags,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      date: "",
      time: "",
      author: "",
      image: null,
      tags: [],
    });
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{editId ? "Edit Berita" : "Tambah Berita"}</h1>
      <div className="grid gap-3 mb-6">
        <input name="title" placeholder="Judul" value={formData.title} onChange={handleChange} className="border p-2" />
        <input name="excerpt" placeholder="Excerpt" value={formData.excerpt} onChange={handleChange} className="border p-2" />
        <textarea name="content" placeholder="Konten" value={formData.content} onChange={handleChange} className="border p-2" />
        <select name="category" value={formData.category} onChange={handleChange} className="border p-2">
          <option value="">-- Pilih Kategori --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="datetime-local" name="datetime" value={formData.date && formData.time ? `${formData.date}T${formData.time}` : ""} onChange={handleChange} className="border p-2" />
        <input name="author" placeholder="Penulis" value={formData.author} onChange={handleChange} className="border p-2" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2" />
        <input name="tags" placeholder="Tag (pisahkan dengan koma)" value={formData.tags.join(",")} onChange={handleChange} className="border p-2" />
        <div className="flex gap-2">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            {editId ? "Update Berita" : "Tambah Berita"}
          </button>
          {editId && (
            <button onClick={resetForm} className="bg-gray-300 text-black px-4 py-2 rounded">
              Batal
            </button>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Daftar Berita</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {newsList.map((news) => (
          <div key={news._id} className="border p-4 rounded shadow-sm">
            <h3 className="font-bold text-lg">{news.title}</h3>
            <p className="text-sm text-gray-500">{news.date} {news.time} | {news.category}</p>
            {news.image && (
              <img
                src={`http://localhost:5000/uploads/${news.image}`}
                alt={news.title}
                className="w-full h-48 object-cover mt-2"
              />
            )}
            <p className="mt-2">{news.excerpt}</p>
            <p className="text-sm text-gray-700 mt-1">Penulis: {news.author}</p>
            <p className="text-sm text-gray-600">Tags: {news.tags.join(", ")}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => news._id && handleEdit(news)} className="text-blue-500">
                Edit
              </button>
              <button onClick={() => news._id && handleDelete(news._id)} className="text-red-500">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdminNews;
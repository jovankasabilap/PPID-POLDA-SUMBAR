// src/layout/Layout.tsx
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm"
import { useState } from "react"

export default function Layout() {
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const handleLoginClick = () => setIsLoginOpen(true)
    const handleLoginClose = () => setIsLoginOpen(false)

    return (
        <>
        <Header
            onLoginClick={handleLoginClick}
            isLoggedIn={false}
            onLogout={() => console.log("logout")}
        />
        <div className="min-h-screen bg-white">
            <Outlet />
        </div>
        <Footer />
        {isLoginOpen && <LoginForm onClose={handleLoginClose} />}
        </>
    )
}
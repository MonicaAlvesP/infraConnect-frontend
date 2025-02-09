'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/services/api"
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";

import s from "./login.module.scss"

export default function Login() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const data = await loginUser(username, password)
      const token = data.token
      const is_staff = data.is_staff
      if (token) {
        localStorage.setItem("token", token)
        localStorage.setItem("is_staff", is_staff)
        router.push("/create-post")
      }
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao fazer login")
    }
  }

  return (
    <section className={s.container}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.inputGroup}>
          <FaRegUser />
          <input
            placeholder="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className={s.inputGroup}>
          <TbLockPassword />
          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={s.button}
        >Entrar</button>
      </form>
    </section>
  );
}

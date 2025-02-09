'use client';

import { useState } from "react";
import { registerUser } from "@/services/api";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";

import s from './register.module.scss'

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser(username, password);
      const token = data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
    } catch (error) {
      setError(error.error || "Erro ao registrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={s.container}>
      <h1>Registrar</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        className={s.form}
      >
        <div className={s.inputGroup}>
          <FaRegUser />
          <input
            placeholder="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={s.button}
        >
          {loading ? "Carregando..." : "Registrar"}
        </button>
      </form>
    </section>
  );
}

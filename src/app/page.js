'use client'
import { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";
import s from "@/styles/home.module.scss"

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  return (
    <main className={s.container}>
      <section className={s.imageHome}>
        <h1>Bem-vindo ao InfraConnect</h1>
        <p>realize seu login e acesse os comunicados</p>
      </section>

      <section className={s.content}>
        {showLogin ? <Login /> : <Register />}
        <div className={s.anchor}>
          {showLogin ? (
            <p>Ainda não possui registro?
              <a
                href="#"
                onClick={handleRegisterClick}
              >
                registre-se
              </a>
            </p>
          ) : (
            <p>Já possui uma conta?
              <a
                href="#"
                onClick={handleLoginClick}
              >
                realizar login
              </a>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

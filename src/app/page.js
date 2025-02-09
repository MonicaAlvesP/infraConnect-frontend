'use client'
import { useState } from "react";
import Login from "../components/login";
import Image from "next/image";
import IconHome from "@/assets/logo-social.svg";
import Register from "../components/register";
import s from "@/styles/home.module.scss"

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);
  const [activeButton, setActiveButton] = useState('login');

  const handleLoginClick = () => {
    setShowLogin(true);
    setActiveButton('login');
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setActiveButton('register');
  };

  return (
    <main className={s.container}>
      <section className={s.imageHome}>
        <Image src={IconHome} alt="Logo" className={s.image} />
      </section>

      <section className={s.buttonSeletion}>
        <div className={s.content}>
          <h1>Bem-vindo ao InfraConnect!</h1>
          <p>Já tem uma conta? Faça login. Se não, registre-se e junte-se a nós!</p>
        </div>
        <div className={s.anchor}>
          <a
            href="#"
            onClick={handleLoginClick}
            className={activeButton === 'login' ? s.active : ''}
          >
            login
          </a>
          <a
            href="#"
            onClick={handleRegisterClick}
            className={activeButton === 'register' ? s.active : ''}
          >
            registrar-se
          </a>
        </div>
        {showLogin ? <Login /> : <Register />}
      </section>
    </main>
  );
}

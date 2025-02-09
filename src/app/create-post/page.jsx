"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/api";
import s from "./createPost.module.scss";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const editorRef = useRef(null);

  useEffect(() => {
    const isStaff = localStorage.getItem("is_staff");
    if (isStaff === "true") {
      setAuthorized(true);
    } else {
      router.push("/posts");
    }
  }, [router]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Você precisa estar logado para criar posts.");
      return;
    }

    try {
      const data = await createPost(token, title, content);
      if (data) {
        setSuccess("Post criado com sucesso!");
        router.push("/posts");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao criar o post.");
    }
  };

  if (!authorized) {
    return <div>Verificando permissões...</div>;
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>Criar Novo Post</h1>
      {error && <p className={`${s.message} ${s.error}`}>{error}</p>}
      {success && <p className={`${s.message} ${s.success}`}>{success}</p>}

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.formGroup}>
          <label className={s.label}>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={s.input}
            required
          />
        </div>

        <div className={s.formGroup}>
          <label className={s.label}>Conteúdo:</label>
          <JoditEditor
            ref={editorRef}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => { }}
          />
        </div>

        <button type="submit" className={s.button}>
          Criar Post
        </button>
      </form>
    </section>
  );
}

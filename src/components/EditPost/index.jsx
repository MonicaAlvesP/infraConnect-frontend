"use client"

import { useEffect, useState } from "react"
import s from "./editPostForm.module.scss"

export default function EditPostForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  useEffect(() => {
    setTitle(post.title)
    setContent(post.content)
  }, [post])

  const handleSave = () => {
    onSave({ id: post.id, title, content })
    setTitle("")
    setContent("")
  }

  return (
    <div className={s.editForm}>
      <h2>Editar Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Conteúdo"
      />
      <div className={s.buttons}>
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

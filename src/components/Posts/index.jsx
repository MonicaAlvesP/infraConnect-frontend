"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import EditPostModal from "@/components/EditPostModal";
import { getPosts, createPost, updatePost, deletePost } from "@/services/api";
import s from "./posts.module.scss";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const isAdmin =
    typeof window !== "undefined" &&
    localStorage.getItem("is_staff") === "true";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.posts);
      } catch (err) {
        setError(
          "Erro ao buscar posts: " + (err.response?.data || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      setIsSaving(true);
      await deletePost(token, postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Erro ao deletar o post.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreate = async (title, content) => {
    try {
      setIsSaving(true);
      const response = await createPost(token, title, content);
      setPosts([...posts, response]);
    } catch (err) {
      setError("Erro ao criar o post.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setModalIsOpen(true);
  };

  const handleUpdate = async (updatedPost) => {
    try {
      setIsSaving(true);
      const response = await updatePost(
        token,
        updatedPost.id,
        updatedPost.title,
        updatedPost.content
      );
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? response : post))
      );
      setEditingPost(null);
      setModalIsOpen(false);
    } catch (err) {
      setError("Erro ao atualizar o post.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className={s.loading}>Carregando posts...</p>;
  if (error)
    return <p className={`${s.message} ${s.error}`}>{error}</p>;

  return (
    <section className={s.container}>
      <h1 className={s.title}>Últimos Posts</h1>
      {posts.length === 0 ? (
        <p>Nenhum post disponível.</p>
      ) : (
        <div className={s.postsList}>
          <PostList
            posts={posts}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <EditPostModal
        isOpen={modalIsOpen}
        post={editingPost}
        onSave={handleUpdate}
        onCancel={() => {
          setModalIsOpen(false);
          setEditingPost(null);
        }}
      />
    </section>
  );
}

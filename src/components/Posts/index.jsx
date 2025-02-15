"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostList from "./PostList";
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) return <p className={s.loading}>Carregando posts...</p>;
  if (error)
    return <p className={`${s.message} ${s.error}`}>{error}</p>;

  return (
    <section className={s.container}>
      <h1 className={s.title}>Últimos Posts</h1>
      {currentPosts.length === 0 ? (
        <p>Nenhum post disponível.</p>
      ) : (
        <div className={s.postsList}>
          <PostList
            posts={currentPosts}
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
      <span className={s.pagination}>
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? s.active : ""}
          >
            {i + 1}
          </button>
        ))}
      </span>
    </section>
  );
}

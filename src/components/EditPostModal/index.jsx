"use client";

import { useEffect } from "react";
import Modal from "react-modal";
import EditPostForm from "@/components/EditPost/index";
import s from "./editPostModal.module.scss";

export default function EditPostModal({ isOpen, post, onSave, onCancel }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const appElement = document.getElementById("__next") || document.body;
      Modal.setAppElement(appElement);
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Editar Post"
      className={s.modal}
      overlayClassName={s.overlay}
    >
      {post && (
        <EditPostForm post={post} onSave={onSave} onCancel={onCancel} />
      )}
    </Modal>
  );
}

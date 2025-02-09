import { useState } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PostEditor = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const handleSave = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Título e conteúdo não podem estar vazios.");
      return;
    }
    onSave({ ...post, title, content });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />
      <JoditEditor
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default PostEditor;
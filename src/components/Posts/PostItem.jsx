

const PostItem = ({ post, isAdmin, onEdit, onDelete }) => (
  <section>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    {isAdmin && (
      <div>
        <button onClick={() => onEdit(post)}>Editar</button>
        <button onClick={() => onDelete(post.id)}>Deletar</button>
      </div>
    )}
  </section>
);

export default PostItem;
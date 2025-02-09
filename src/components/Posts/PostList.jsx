import s from './posts.module.scss'

const PostList = ({ posts, isAdmin, onEdit, onDelete }) => {
  const validPosts = Array.isArray(posts) ? posts : [];

  return (
    <section>
      {validPosts.length === 0 ? (
        <p>Nenhum post disponível.</p>
      ) : (
        validPosts.map(post => (
          <section
            key={post.id}
            className={s.content}
          >
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {isAdmin && (
              <div className={s.actions}>
                <button onClick={() => onEdit(post)}>Editar</button>
                <button onClick={() => onDelete(post.id)}>Deletar</button>
              </div>
            )}
          </section>
        ))
      )}
    </section>
  );
};

export default PostList
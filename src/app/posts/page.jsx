'use client'

import Posts from "@/components/Posts";
import s from './posts.module.scss';

export default function PostsPage() {
  return (
    <section className={s.container}>
      <Posts />
    </section>
  );
}

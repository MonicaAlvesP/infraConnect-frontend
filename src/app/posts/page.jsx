'use client'

import Posts from "@/components/Posts";
import ImageCarousel from "@/components/Carousel/ImageCarousel";

export default function PostsPage() {
  return (
    <section>
      <ImageCarousel />
      <Posts />
    </section>
  );
}

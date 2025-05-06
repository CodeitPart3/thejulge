import { useEffect } from "react";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import Post from "./Post";
import { PostData } from "./PostList";

interface PostListSliderProps {
  posts: PostData[];
  intervalMs?: number;
}

export default function PostListSlider({
  posts,
  intervalMs = 3000,
}: PostListSliderProps) {
  const lessThanDesktop =
    typeof window !== "undefined" && window.innerWidth <= 1024;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    drag: lessThanDesktop,
    mode: "snap",
  });

  useEffect(() => {
    if (!instanceRef.current || lessThanDesktop) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [instanceRef, lessThanDesktop, intervalMs]);

  if (!posts || posts.length === 0) return null;

  return (
    <div ref={sliderRef} className="keen-slider">
      {posts.map((post) => (
        <div key={post.id} className="keen-slider__slide">
          <Post {...post} />
        </div>
      ))}
    </div>
  );
}

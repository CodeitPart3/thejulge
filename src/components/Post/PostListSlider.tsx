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
      perView: 3,
      spacing: 14,
    },
    breakpoints: {
      "(max-width: 80rem)": {
        slides: {
          // perView: 3,
          perView: 2,
          spacing: 14,
        },
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
    <div ref={sliderRef} className="keen-slider !w-[60.25rem] mx-auto">
      {posts.map((post) => (
        <div key={post.id} className="keen-slider__slide post-slide">
          <Post {...post} />
        </div>
      ))}
    </div>
  );
}

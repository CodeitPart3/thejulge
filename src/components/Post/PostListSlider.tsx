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
      perView: 2, // 기본, sm: 2개
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: {
          perView: 3, // lg 이상: 3개
          spacing: 6,
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
    <div className="w-full px-8 lg:max-w-[60.25rem] mx-auto">
      <div ref={sliderRef} className="keen-slider">
        {posts.map((post) => (
          <div key={post.id} className="keen-slider__slide w-1/2 lg:w-1/3 p-1">
            <Post {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}

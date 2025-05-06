// import Post from "./Post";
// import "keen-slider/keen-slider.min.css";
// import { PostData } from "./PostList";

// interface PostListSliderProps {
//   posts: PostData[];
// }

// export default function PostListSlider({ posts }: PostListSliderProps) {
//   return (
//     <div className="keen-slider">
//       {posts.map((post) => (
//         <div key={post.id} className="keen-slider__slide">
//           <Post {...post} />
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect } from "react";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import Post from "./Post"; // 실제 공고 카드 컴포넌트
import { PostData } from "./PostList"; // 타입 위치는 프로젝트에 맞게 수정

interface PostListSliderProps {
  posts: PostData[];
}

export default function PostListSlider({ posts }: PostListSliderProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;

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
    drag: isMobile,
    mode: "snap",
  });

  useEffect(() => {
    if (!instanceRef.current || isMobile) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef, isMobile]);

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

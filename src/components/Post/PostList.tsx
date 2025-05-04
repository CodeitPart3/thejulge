import Post from "./Post";

export interface PostData {
  id: string;
  name: string;
  imageUrl: string;
  address1: string;
  originalHourlyPay: number;
  link: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <section className="grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 md:gap-x-[14px] md:gap-y-[32px]">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useUser } from "../context/UserContext";
import { useInfinitePosts } from "../hooks/usePosts";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePosts();
  const { logout } = useUser();
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.results) || [];

  const filteredPosts = allPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
        );
      }
      return (
        new Date(a.created_datetime).getTime() -
        new Date(b.created_datetime).getTime()
      );
    });

  return (
    <div className="max-w-[1080px] min-h-screen mx-auto bg-white flex flex-col items-center">
      <header className="w-full bg-blue-500 text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-lg font-bold">CodeLeap Network</h1>
        <button onClick={logout} className="text-sm underline hover:opacity-30">
          Logout
        </button>
      </header>

      <main className="w-full p-6 flex-1 flex flex-col gap-6">
        <PostForm />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-md w-full md:max-w-xs"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="border px-3 py-2 rounded-md"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {isLoading && <p className="text-center">Loading posts...</p>}

        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        {isFetchingNextPage && <p className="text-center">Loading more...</p>}
        <div ref={loadMoreRef} className="h-8" />
      </main>
    </div>
  );
}

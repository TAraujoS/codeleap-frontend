import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../context/UserContext";
import { useCreatePost } from "../hooks/usePosts";
import { toast } from "react-toastify";
import Button from "./Button";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(3, "Content is required"),
});

type FormData = z.infer<typeof schema>;

export default function PostForm() {
  const { username } = useUser();
  const createPost = useCreatePost();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const title = watch("title");
  const content = watch("content");

  const onSubmit = (data: FormData) => {
    if (!username) return;
    createPost.mutate(
      {
        username,
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          toast.success("Post created!");
          reset();
        },
        onError: () => {
          toast.error("Failed to create post.");
        },
      }
    );
  };

  const isDisabled = !title || !content;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-black p-6 rounded-2xl space-y-4"
    >
      <h2 className="text-lg font-bold text-black">
        What’s on your mind {username}?
      </h2>

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Title
        </label>
        <input
          type="text"
          {...register("title")}
          placeholder="Hello world"
          className="w-full h-8 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Content
        </label>
        <textarea
          rows={4}
          {...register("content")}
          placeholder="Content here..."
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-center md:justify-end">
        <Button variant="primary" disabled={isDisabled} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

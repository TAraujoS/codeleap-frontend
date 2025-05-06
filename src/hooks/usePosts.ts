import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { api } from "../services/api";

type Post = {
  id: number;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
};

export function useInfinitePosts() {
  return useInfiniteQuery<ApiResponse>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await api.get(`/?limit=5&offset=${pageParam}`);
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: Omit<Post, "id" | "created_datetime">) =>
      api.post("/", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      content,
    }: {
      id: number;
      title: string;
      content: string;
    }) => api.patch(`/${id}/`, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

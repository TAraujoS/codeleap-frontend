import { formatDistanceToNow } from "date-fns";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useDeletePost, useUpdatePost } from "../hooks/usePosts";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import { toast } from "react-toastify";

type PostCardProps = {
  id: number;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PostCard({
  id,
  username,
  title,
  content,
  created_datetime,
}: PostCardProps) {
  const { username: currentUser } = useUser();

  const isOwner = currentUser === username;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const handleDelete = () => {
    deletePost.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted!");
        setDeleteOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete post.");
      },
    });
  };

  const handleEdit = (data: { title: string; content: string }) => {
    updatePost.mutate(
      { id, ...data },
      {
        onSuccess: () => {
          toast.success("Post updated!");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update post.");
        },
      }
    );
  };

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
        <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="font-bold text-lg">{title}</h2>
          {isOwner && (
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteOpen(true)}
                className="hover:opacity-80 transition"
                title="Delete"
              >
                <FaTrash size={16} />
              </button>
              <button
                onClick={() => setEditOpen(true)}
                className="hover:opacity-80 transition"
                title="Edit"
              >
                <FaEdit size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between text-xs text-gray-600 px-4 py-2">
          <span className="font-bold">@{username}</span>
          <span>{formatDistanceToNow(new Date(created_datetime))}</span>
        </div>

        <div className="px-4 py-2 text-sm text-black whitespace-pre-wrap">
          {content}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <EditModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEdit}
        initialTitle={title}
        initialContent={content}
      />
    </>
  );
}

// src/components/EditModal.tsx
import Button from "../Button";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; content: string }) => void;
  initialTitle: string;
  initialContent: string;
};

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  initialTitle,
  initialContent,
}: EditModalProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: initialTitle,
      content: initialContent,
    },
  });

  const submit = (data: { title: string; content: string }) => {
    onSave(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold text-black mb-4">Edit Item</h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-1 block">
            Content
          </label>
          <textarea
            rows={4}
            {...register("content")}
            className="w-full border border-gray-300 px-3 py-2 rounded-md resize-none"
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <Button variant="cancel" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

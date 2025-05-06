import Button from "../Button";
import Modal from "./Modal";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold text-black mb-6">
        Are you sure you want to delete this item?
      </h2>
      <div className="flex justify-end gap-4">
        <Button variant="cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

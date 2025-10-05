import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const DeleteModal = () => {
  const { isDeleteModalOpen, closeDeleteModal, deleteProfile } = useAuthStore();

  if (!isDeleteModalOpen) return null;

  return (
    <dialog className="modal" open>
      {/* Overlay/backdrop gets the blur effect */}
      <div className="modal-box relative z-10">
        <h3 className="font-bold text-lg text-error">Delete Account!</h3>
        <p className="py-4">
          Are you sure you want to delete the account? This action is
          irreversible.
        </p>
        <div className="modal-action">
          <button
            className="btn btn-sm lg:btn-md btn-error"
            onClick={deleteProfile}
          >
            Yes, Delete
          </button>
          <button className="btn btn-sm lg:btn-md" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </div>

      {/* Custom modal-backdrop with blur */}
      <div
        className="modal-backdrop backdrop-blur-sm bg-black/40"
        onClick={closeDeleteModal}
      />
    </dialog>
  );
};

export default DeleteModal;

import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onClose, onSubmit, isLoading }) {
  return (
    <PopupWithForm
      className="popup_delete"
      title="Вы уверены?"
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      nameForm="delete"
      buttonTitle="Да"
      onSubmit={onSubmit}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;

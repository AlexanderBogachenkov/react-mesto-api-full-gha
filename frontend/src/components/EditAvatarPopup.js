import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarReference = React.useRef();

  React.useEffect(() => {
    avatarReference.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarReference.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      name="avatar-form"
      title="Обновить аватар"
      buttonTitle="Сохранить"
    >
      <input
        className="popup__input popup__input_type_avatar"
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Укажите ссылку на аватар"
        required
        ref={avatarReference}
      />
      <span id="avatar-input-error" className="error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

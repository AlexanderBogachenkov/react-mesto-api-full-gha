import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("Jacques Cousteau");
  const [description, setDescription] = React.useState("Sailor, researcher");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      name="profile-form"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Отредактируй имя"
        name="profileName"
        id="profail-name"
        className="popup__profile popup__profile_type_name popup__input"
        type="text"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span id="profail-name-error" className="popup__error"></span>
      <input
        placeholder="Отредактируй описание"
        name="popup__profileDescription_form"
        id="profail-description"
        className="popup__profile popup__profile_type_description popup__input"
        type="text"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span id="profail-description-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

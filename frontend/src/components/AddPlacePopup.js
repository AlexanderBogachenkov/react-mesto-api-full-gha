import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const nameRef = useRef("");
  const linkRef = useRef("");

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = "";
      linkRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      name="add-place-form"
      title="Новое место"
      buttonTitle="Создать"
    >
      <input
        placeholder="Название"
        name="placeName"
        id="place-name"
        className="popup-add-place__type popup-add-place__type_name popup__input"
        type="text"
        autoComplete="off"
        minLength="2"
        maxLength="30"
        required
        ref={nameRef}
      />
      <span id="place-name-error" className="popup__error"></span>
      <input
        placeholder="Ссылка на картинку"
        name="placeUrl"
        id="place-url"
        className="popup-add-place__type popup-add-place__type_src popup__input"
        type="url"
        required
        ref={linkRef}
      />
      <span id="place-url-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

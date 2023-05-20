import React, { useCallback, useEffect } from "react";

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

function useEscapeKey(handleClose) {
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

function ImagePopup({ card, onClose, closeAllPopupsByClickOnOverlay }) {
  useEscapeKey(onClose);

  return (
    //Если кард true добавляем popup_opened tag
    <div
      className={`popup popup-show-image deeper-background-color ${
        card && "popup_opened"
      }`}
      onMouseDown={closeAllPopupsByClickOnOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close-button popup-show-image__close-button animate-link animate-link_deeper"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>

        {/* Если кард true добавляем card.link и card.name */}
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h4 className="popup__image-name" aria-label="Название места">
          {card ? card.name : ""}
        </h4>
      </div>
    </div>
  );
}

export default ImagePopup;

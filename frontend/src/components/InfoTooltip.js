import React from "react";

function InfoToolTip({
  isOpen,
  onClose,
  notification,
  closeAllPopupsByClickOnOverlay,
}) {
  return (
    <div
      className={
        isOpen ? `popup popup_opened popup_type_tip` : `popup popup_type_tip`
      }
      onMouseDown={closeAllPopupsByClickOnOverlay}
    >
      <div className="popup__container-registry popup__container_type_tip">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть попап"
        ></button>
        <img
          src={notification.pic}
          alt="notification pic"
          className="popup__notification-pic"
        />
        <p className="popup__notification-text">{notification.text}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;

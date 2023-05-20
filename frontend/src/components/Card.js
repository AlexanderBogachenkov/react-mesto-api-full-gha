import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `grid__heart ${
    isLiked && "place__like_active grid__heart_active"
  }`;

  function handleClick() {
    //пробрасываем selectedCard из App -> Main -> Card
    //по клику меняется isOpen
    onCardClick(card);
  }
  //пробрасываем onCardDelete из App -> Main -> Card
  //по клику меняется isOpen

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="grid__element">
      <img
        alt={card.name}
        className="grid__image"
        src={card.link}
        onClick={handleClick}
      />
      <div className="grid__place">
        <h2 className="grid__city">{card.name}</h2>
        <div className="grid__like-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="grid__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {/* Далее в разметке используем переменную для условного рендеринга */}

      {isOwn && (
        <button
          type="button"
          className="grid__delete-button"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;

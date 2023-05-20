import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__picture"
            src={currentUser.avatar}
            alt="Жак-Ив Кусто"
          />
        </button>

        <div className="profile__grid">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button animate-link animate-link_deeper"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button animate-link animate-link_deeper"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="grids" aria-label="Места мира">
        <ul className="grid">
          {/* Вставляем карточки */}
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick} //пробрасываем selectedCard из App в Card
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

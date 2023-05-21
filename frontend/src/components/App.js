import React from "react";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import * as Auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
// import FormValidationTest from "../FormValidationTest";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import loginSuccessful from "../images/seccRegistration.svg";
import loginUnsuccessful from "../images/unseccRegistration.svg";
import InfoTooltip from "./InfoTooltip";

function App() {
  //Начальные стейты
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] =
    React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [notification, setNotification] = React.useState({ text: "", pic: "" });
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  const navigate = useNavigate();

//   React.useEffect(() => {
//     tokenCheck();
// }, []);

// React.useEffect(() => {
//     if (loggedIn) {
//         api.getUserData()
//             .then((res) => {
//                 // console.log(res)
//                 setCurrentUser(res);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         api.getInitialCards()
//             .then((res) => {
//                     setCards(res);
//                 }
//             )
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// }, [loggedIn]);

  
  const tokenCheck = React.useCallback(() => {
    setIsLoading(true);
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem("token");
    // console.log('token ->' + token);
    if (token) {
      // проверим токен      
      Auth.getContent(token)      
        .then((data) => {          
          // console.log('data ->' + data.email)
          if (data.email) {
            // авторизуем пользователя
            console.log('tokenCheck 80 -> ' + loggedIn);
            setLoggedIn(true);
            console.log('tokenCheck 82 -> ' + loggedIn);
            // console.log('userData.data.email -> ' + userData.data.email)
            setEmail(data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log("tokenCheckErr -> ", err); // выведем ошибку в консоль
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);



  // При каждом рендере
  React.useEffect(() => {
    // tokenCheck();
    // console.log('loggedIn 104 -> ' + loggedIn);
    loggedIn &&
      // Общий промис - получаем данные юзера и карточки сайта
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userServerData, cardsData]) => {
          //Если ок, в стейт идут userServerData и cardsData
          setCurrentUser(userServerData);
          setCards(cardsData);
          // console.log('userServerData -> ' + JSON.stringify(userServerData));
          // console.log('cardsData -> ' + JSON.stringify(cardsData));

        })
        .catch((err) => {
          console.log(err);
        });
    
  }, [loggedIn, tokenCheck]);

  //Выбранная карточка
  const [selectedCard, setSelectedCard] = React.useState(null);

  // Обработчики событий //
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  // Обработчики кликов на открытие попапов
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // console.log(card._id);
    // console.log('currentUser -> ' + currentUser);
    // Снова проверяем, есть ли уже лайк на этой карточке    
    // const isLiked = card.likes.some((i) => i._id ?  i._id : i === currentUser.data._id);
    // const isLiked = card.likes.some((i) => i === currentUser._id);
    // const isLiked = card.likes.some((i) => console.log(i._id, currentUser._id));
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // console.log(card.likes);
    // console.log(currentUser._id);
    // console.log(isLiked);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    (!isLiked ? api.addLikeToCard(card._id) : api.deleteLikeFromCard(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  function handleDeletePlaceClick(card) {
    setIsDeletePlacePopupOpen(true);
    setCardForDelete(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        const newCards = cards.filter((elem) => elem !== cardForDelete);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        //Добавим изменение в тексте кнопки
        setIsLoading(false);
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .changeUserData(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        //Добавим изменение в тексте кнопки
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        //Добавим изменение в тексте кнопки
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        //Добавим изменение в тексте кнопки
        setIsLoading(false);
      });
  }

  //Закрываем все окна
  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeletePlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  function closeAllPopupsByClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  const handleLogin = (email, password) => {
    setIsLoading(true);
    // console.log("isLoading ->", isLoading);
    Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          // console.log('setLoggedIn -> 260' + setLoggedIn);
          setEmail(email);
          navigate("/");
        }
      })
      .catch(() => {
        setIsInfoToolTipOpen(true);
        setNotification({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          pic: loginUnsuccessful,
        });
      })
      .finally(() => {
        //Добавим изменение в тексте кнопки
        setIsLoading(false);
      });
  };

  const handleRegister = (email, password) => {
    setIsLoading(true);
    return Auth.register(email, password)
      .then((res) => {
        // console.log(res);
        
          // setLoggedIn(true);
          setIsInfoToolTipOpen(true);
          setNotification({
            text: "Вы успешно зарегистрировались!",
            pic: loginSuccessful,
          });
          navigate("/signin", { replace: true });
          // console.log('to sign in');
          setEmail(email);
      
      })
      .catch(() => {
        setIsInfoToolTipOpen(true);
        setNotification({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          pic: loginUnsuccessful,
        });
      })
      .finally(() => {
        //Добавим изменение в тексте кнопки
        setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/signin");
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute path="/" loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick} // пробрасываем selectedCard в Main
                  onCardDelete={handleDeletePlaceClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          {/* {console.log("isLoading ->", isLoading)} */}

          <Route
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                handleLogin={handleLogin}
                tokenCheck={tokenCheck}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                loggedIn={loggedIn}
                handleRegister={handleRegister}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="./signup" />
            }
          />
        </Routes>

        {/* пробрасываем selectedCard в ImagePopup */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          closeAllPopupsByClickOnOverlay={closeAllPopupsByClickOnOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeletePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          notification={notification}
          closeAllPopupsByClickOnOverlay={closeAllPopupsByClickOnOverlay}
        />
        {/* <FormValidationTest /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

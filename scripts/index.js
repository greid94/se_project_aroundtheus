const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalClose = profileEditModal.querySelector("#modal-button-close");
const addCardModalClose = addCardModal.querySelector("#modal-button-close");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardBtn = document.querySelector(".profile__add-button");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormEl.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormEl.querySelector(".modal__input_type_url");
const previewModal = document.querySelector("#preview-modal");
const previewModalClose = previewModal.querySelector("#modal-button-close");
const modalImgEl = previewModal.querySelector(".modal__image_popup");
const modalCaption = previewModal.querySelector(".modal__caption");
/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function renderCard(initialCards, wrapper) {
  const cardElement = getCardElement(initialCards);
  wrapper.prepend(cardElement);
}

function getCardElement(initialCards) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  //set the path to the image to the link field of the object
  cardImageEl.src = initialCards.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = initialCards.name;
  //set the card title to the name field of the object, too
  cardTitleEl.textContent = initialCards.name;
  // set the path to get like button and turn it on and off

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEl.addEventListener("click", () => {
    modalImgEl.src = initialCards.link;
    modalCaption.textContent = initialCards.name;
    openModal(previewModal);
  });

  previewModalClose.addEventListener("click", () => {
    closePopup(previewModal);
  });

  //return the ready HTML element with the filled-in data
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               event handlers                               */
/* -------------------------------------------------------------------------- */
function handleProlileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
}

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

addNewCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});
addCardModalClose.addEventListener("click", () => {
  closePopup(addCardModal);
});

profileEditForm.addEventListener("submit", handleProlileEditSubmit);
addCardModal.addEventListener("submit", handleAddCardSubmit);
initialCards.forEach((initialCards) => {
  renderCard(initialCards, cardListEl);
});

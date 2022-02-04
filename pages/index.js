const popup = document.querySelectorAll('.popup');
const popupCard = document.querySelector('#popup_card');

//edit avatar constants
const avatarPopup = document.querySelector('#popup_edit-avatar');
const avatarOpenButton = document.querySelector('.profile__avatar-link');
const avatarCloseButton = avatarPopup.querySelector('.popup__close-button');
const avatarLink = document.querySelector("div.popup input[name='avatar-link']");
const avatarForm = avatarPopup.querySelector('.form');

// edit profile constants
const profilePopup = document.querySelector('#popup_edit-profile');
const profileOpenButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = profilePopup.querySelector('.form');
const profileUserNameValue = document.querySelector("div.popup input[name='user-name']");
const profileUserStatusValue = document.querySelector("div.popup input[name='user-status']");
const userName = document.querySelector('.profile__username');
const userStatus = document.querySelector('.profile__status')

// add card constants
const newCardPopup = document.querySelector('#popup_add-card');
const newCardForm = newCardPopup.querySelector('.form');
const newCardOpenButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newCardPopup.querySelector('.popup__close-button');
const locationName = document.querySelector("div.popup input[name='location-name']");
const locationImage = document.querySelector("div.popup input[name='location-image']");

//creating cards constants
const cardsContainer = document.querySelector('.elements');

// open popup function
function openPopup (popupName) {
	popupName.classList.add('popup_opened');
	window.addEventListener('keydown', closeByEsc);
	window.addEventListener('click', closeByOverlay);
}

// close popup function
function closePopup (popupName) {
	popupName.classList.remove('popup_opened');
	window.removeEventListener('keydown', closeByEsc);
	window.removeEventListener('click', closeByOverlay);
}

//closing popup by Overlay

function closeByOverlay (evt) {
	const popup = document.querySelector('.popup_opened');
	if (evt.target.classList.contains('popup')) {
		closePopup(popup);
	}
}

// closing popup by Esc
function closeByEsc (evt) {
	const popup = document.querySelector('.popup_opened')
	if (evt.key === 'Escape') {
		closePopup(popup);
	}
}

// close popupCard handler
popupCard.querySelector('.popup__close-button').addEventListener('click', function () {
	closePopup(popupCard);
});

// editing avatar popup
avatarOpenButton.addEventListener(('click'), function() {
	openPopup(avatarPopup);
});

avatarCloseButton.addEventListener(('click'), function() {
	closePopup(avatarPopup);
});

function changeAvatar(link) {
	const avatarImage = document.querySelector('.profile__avatar');
	avatarImage.src = link;
}

avatarForm.addEventListener(('submit'), function (evt) {
		evt.preventDefault();
		changeAvatar(avatarLink.value);
		avatarForm.reset();
		closePopup(avatarPopup);
	}
);

// editing profile popup
profileOpenButton.addEventListener(('click'), function() {
	openPopup(profilePopup);
});

profileCloseButton.addEventListener(('click'), function() {
	closePopup(profilePopup);
});

// editing profile from form
function editProfile (name, status) {
	userName.textContent = name.value;
	userStatus.textContent = status.value;
}

// editing profile form handler
newCardCloseButton.addEventListener(('click'), function() {
	closePopup(newCardPopup);
});

profileForm.addEventListener(('submit'), function (event) {
	event.preventDefault();
	editProfile(profileUserNameValue, profileUserStatusValue);
	closePopup(profilePopup);
});

newCardOpenButton.addEventListener(('click'), function () {
	openPopup(newCardPopup);
});

// creating card function
function createCard(title, link) {
	const elementTemplate = document.querySelector('#element-template').content;
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementImage = element.querySelector('.element__image');

	element.querySelector('.element__title').textContent = title;
	elementImage.src = link;
	elementImage.alt = title;

	element.querySelector('.element__like-button').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__like-button_active');
	});

	element.querySelector('.element__delete-button').addEventListener('click', function (evt) {
		evt.target.parentElement.remove();
	});

	element.querySelector('.element__image').addEventListener('click', function () {
		popupCard.querySelector('.popup__image').src = link;
		popupCard.querySelector('.popup__image').alt = title;
		popupCard.querySelector('.popup__image-caption').textContent = title;
		openPopup(popupCard);
	});

	return element;
}

function addCard (container, cardElement) {
	container.prepend(cardElement);
}

// adding card form
newCardForm.addEventListener(('submit'), function (evt) {
	evt.preventDefault();

	addCard(cardsContainer, createCard(locationName.value, locationImage.value));
	newCardForm.reset();
	closePopup(newCardPopup);
	}
);

// adding cards onload
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

initialCards.forEach(card => addCard(cardsContainer, createCard(card.name, card.link)));

// validation

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
	inputElement.classList.add('form__input_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error-text_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
	inputElement.classList.remove('form__input_error');
	errorElement.classList.remove('form__input-error-text_active');
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add('form__submit_inactive');
	} else {
		buttonElement.classList.remove('form__submit_inactive');
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.form__input'));
	const buttonElement = formElement.querySelector('.form__submit');
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
	});
};

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		setEventListeners(formElement);
	});
};

enableValidation();


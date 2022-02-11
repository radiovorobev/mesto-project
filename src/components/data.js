export const popup = document.querySelectorAll('.popup');
export const popupCard = document.querySelector('#popup_card');

//edit avatar constants
export const avatar = document.querySelector('.profile__avatar');
export const avatarPopup = document.querySelector('#popup_edit-avatar');
export const avatarOpenButton = document.querySelector('.profile__avatar-link');
export const avatarCloseButton = avatarPopup.querySelector('.popup__close-button');
export const avatarLink = document.querySelector("div.popup input[name='avatar-link']");
export const avatarForm = avatarPopup.querySelector('.form');

//delete card constants

export const deleteCardPopup = document.querySelector('#popup_delete-card');
export const deleteCardCloseButton = deleteCardPopup.querySelector('.popup__close-button');

// edit profile constants
export const profilePopup = document.querySelector('#popup_edit-profile');
export const profileOpenButton = document.querySelector('.profile__edit-button');
export const profileCloseButton = profilePopup.querySelector('.popup__close-button');
export const profileForm = profilePopup.querySelector('.form');
export const profileUserNameValue = document.querySelector("div.popup input[name='user-name']");
export const profileUserStatusValue = document.querySelector("div.popup input[name='user-status']");
export const userName = document.querySelector('.profile__username');
export const userStatus = document.querySelector('.profile__status');
export const userAvatar = document.querySelector('.profile__avatar');

// add card constants
export const newCardPopup = document.querySelector('#popup_add-card');
export const newCardForm = newCardPopup.querySelector('.form');
export const newCardOpenButton = document.querySelector('.profile__add-button');
export const newCardCloseButton = newCardPopup.querySelector('.popup__close-button');
export const locationName = document.querySelector("div.popup input[name='location-name']");
export const locationImage = document.querySelector("div.popup input[name='location-image']");

//creating cards constants
export const cardsContainer = document.querySelector('.elements');
export const elementTemplate = document.querySelector('#element-template').content;
export const cardImage = popupCard.querySelector('.popup__image');
export const cardCaption = popupCard.querySelector('.popup__image-caption');

//validation classes setup

export const validationSetup = {
	formSelector: '.form',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__submit',
	inactiveButtonClass: 'form__submit_inactive',
	inputErrorClass: 'form__input_error',
	errorClass: 'form__input-error-text_active'
}

export const apiConfig = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
	headers: {
		authorization: 'eea4c386-cf2a-4e8d-9084-1f984fe7c0ec',
		'Content-Type': 'application/json'
	}
}
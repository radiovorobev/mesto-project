import { enableValidation, toggleButtonState } from '../components/validate.js';
import { addCard, createCard, initialCards } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import {
	popupCard,
	avatarPopup,
	avatarOpenButton,
	avatarCloseButton,
	avatarLink,
	avatarForm,
	profilePopup,
	profileOpenButton,
	profileCloseButton,
	profileForm,
	profileUserNameValue,
	profileUserStatusValue,
	userName,
	userStatus,
	newCardPopup,
	newCardForm,
	newCardOpenButton,
	newCardCloseButton,
	locationImage,
	locationName,
	cardsContainer,
	validationSetup
} from '../components/data.js';

import './index.css';


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
	const inputList = Array.from(avatarForm.querySelectorAll(validationSetup.inputSelector));
	const submit = avatarForm.querySelector(validationSetup.submitButtonSelector);
	evt.preventDefault();
	changeAvatar(avatarLink.value);
	avatarForm.reset();
	toggleButtonState(inputList, submit, validationSetup);
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

// adding card form
newCardForm.addEventListener(('submit'), function (evt) {
	evt.preventDefault();
	const inputList = Array.from(newCardForm.querySelectorAll(validationSetup.inputSelector));
	const submit = newCardForm.querySelector(validationSetup.submitButtonSelector);
	addCard(cardsContainer, createCard(locationName.value, locationImage.value));
	newCardForm.reset();
	toggleButtonState(inputList, submit, validationSetup);
	closePopup(newCardPopup);
	}
);

// adding cards onload
initialCards.forEach(card => addCard(cardsContainer, createCard(card.name, card.link)));

enableValidation(validationSetup);


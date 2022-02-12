import { enableValidation, toggleButtonState } from '../components/validate.js';
import { addCard, createCard } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { getProfile, editProfile, getCards, uploadCard, editAvatar } from '../components/api.js';
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
	userAvatar,
	newCardPopup,
	newCardForm,
	newCardOpenButton,
	newCardCloseButton,
	locationImage,
	locationName,
	cardsContainer,
	validationSetup,
	deleteCardPopup,
	deleteCardCloseButton,
	avatar,
	avatarSubmit,
	avatarInputList,
	profileSubmit,
	newCardFormSubmit,
	newCardFormInputList
} from '../components/data.js';

import './index.css';

export let profileId = '';

// close popupCard handler
popupCard.querySelector('.popup__close-button').addEventListener('click', function () {
	closePopup(popupCard);
});

// delete card popup
deleteCardCloseButton.addEventListener(('click'), function() {
	closePopup(deleteCardPopup);
});

// editing avatar popup
avatarOpenButton.addEventListener(('click'), function() {
	openPopup(avatarPopup);
});

avatarCloseButton.addEventListener(('click'), function() {
	closePopup(avatarPopup);
});

avatarForm.addEventListener(('submit'), function (evt) {
	evt.preventDefault();
	avatarSubmit.textContent = 'Coхранение...';
	editAvatar(avatarLink.value)
		.then(() => {
			avatar.src = avatarLink.value;
			closePopup(avatarPopup);
			avatarForm.reset();
			toggleButtonState(avatarInputList, avatarSubmit, validationSetup);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			avatarSubmit.textContent = "Сохранить";
		})
	}
);

// editing profile popup
profileOpenButton.addEventListener(('click'), function() {
	openPopup(profilePopup);
});

profileCloseButton.addEventListener(('click'), function() {
	closePopup(profilePopup);
});

// editing profile form handler
newCardCloseButton.addEventListener(('click'), function() {
	closePopup(newCardPopup);
});

profileForm.addEventListener(('submit'), function (event) {
	event.preventDefault();
	profileSubmit.textContent = 'Coхранение...';
	editProfile(profileUserNameValue.value, profileUserStatusValue.value)
		.then(() => {
		userName.textContent = profileUserNameValue.value;
		userStatus.textContent = profileUserStatusValue.value;
		closePopup(profilePopup);
	})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			profileSubmit.textContent = "Сохранить";
		})
});

newCardOpenButton.addEventListener(('click'), function () {
	openPopup(newCardPopup);
});

// adding card form
newCardForm.addEventListener(('submit'), function (evt) {
	evt.preventDefault();
	newCardFormSubmit.textContent = 'Coхранение...';
	uploadCard(locationName.value, locationImage.value)
		.then((card) => {
			addCard(cardsContainer, createCard(card.name, card.link, card.likes, card._id, card.owner._id));
			closePopup(newCardPopup);
			newCardForm.reset();
			toggleButtonState(newCardFormInputList, newCardFormSubmit, validationSetup);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			newCardFormSubmit.textContent = "Сохранить";
		})
	}
);

enableValidation(validationSetup);

Promise.all([getProfile(), getCards()])
	.then(([profile, cards]) => {
		userName.textContent = profile.name;
		userStatus.textContent = profile.about;
		userAvatar.src = profile.avatar;
		profileUserNameValue.value = profile.name;
		profileUserStatusValue.value = profile.about;
		profileId = profile._id;

		cards.forEach((card) => {
			addCard(cardsContainer, createCard(card.name, card.link, card.likes, card._id, card.owner._id));
		});
	})
	.catch((err) => {
		console.log(err);
	})
import { popupCard, elementTemplate, cardImage, cardCaption, deleteCardPopup } from './data.js';
import { closePopup, openPopup } from './modal.js';
import { profileId } from '../pages/index.js';
import { deleteCardFromServer, addLikeToServer, removeLikeFromServer } from "./api.js";

let deleteElement;
let deleteId;

function addCard (container, cardElement) {
	container.prepend(cardElement);
}

function likeCard(element, button, cardId) {
	if(button.classList.contains('element__like-button_active')) {
		removeLikeFromServer(cardId)
			.then((res) => {
				element.textContent = res.likes.length;
				button.classList.remove('element__like-button_active');
			})
			.catch((err) => {
				console.log(err);
			})
	} else {
		addLikeToServer(cardId)
			.then((res) => {
				element.textContent = res.likes.length;
				button.classList.add('element__like-button_active');
			})
			.catch((err) => {
				console.log(err);
			})
	}

}

export function addDeleteButton() {
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('element__delete-button');
	deleteButton.setAttribute('type','button');
	return deleteButton;
}

function createCard(title, link, likes, cardId, ownerId) {
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementImage = element.querySelector('.element__image');
	const elementLikes = element.querySelector('.element__likes-count');
	const likeButton = element.querySelector('.element__like-button');

	element.querySelector('.element__title').textContent = title;
	elementImage.src = link;
	elementImage.alt = title;
	elementLikes.textContent = likes.length;

	if (ownerId === profileId) {
		addCard(element, addDeleteButton());
	}

	likes.forEach((likedElement) => {
		if(likedElement._id === profileId) {
			likeButton.classList.add('element__like-button_active');
		}
	})

	element.querySelector('.element__like-button').addEventListener('click', (evt) => {
		likeCard(elementLikes, evt.target, cardId);
	});

	element.querySelector('.element__image').addEventListener('click', function () {
		cardImage.src = link;
		cardImage.alt = title;
		cardCaption.textContent = title;
		openPopup(popupCard);
	});

	const deleteButton = element.querySelector('.element__delete-button');
	if (deleteButton) {
		deleteButton.addEventListener('click', (evt) => {
			deleteElement = evt.target.closest('.element');
			deleteId = cardId;
			openPopup(deleteCardPopup);
		});
	}

	return element;
}

function deleteCard() {
	deleteCardFromServer(deleteId)
		.then(() => {
			deleteElement.remove();
			closePopup(deleteCardPopup);
		})
		.catch((err) => {
			console.log(err);
		})
}

deleteCardPopup.addEventListener("click", deleteCard);

export { popupCard, addCard, createCard, deleteCard };
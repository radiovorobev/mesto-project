import { popupCard } from './data.js';
import { openPopup } from './modal.js';

function addCard (container, cardElement) {
	container.prepend(cardElement);
}

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

export { popupCard, addCard, createCard, initialCards };
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

for (let i = 0; i < initialCards.length; i++) {
	addCard(initialCards[i].name, initialCards[i].link);
}

// close popup function

function closePopup (popupName) {
	popupName.classList.remove('popup_opened');
}

// open popup function

function openPopup (popupName) {
	popupName.classList.add('popup_opened');
}

// editing profile popup

const popupProfile = document.querySelector('#popup_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopup = popupProfile.querySelector('.popup__close-button');
const userNameValue = document.querySelector("div.popup input[name='user-name']");
const userStatusValue = document.querySelector("div.popup input[name='user-status']");
const formProfile = popupProfile.querySelector('.form');

buttonEditProfile.addEventListener(('click'), function() {
	openPopup(popupProfile);
})

buttonClosePopup.addEventListener(('click'), function() {
	closePopup(popupProfile);
})

// editing profile from form

function editProfile (name, status) {
	const userName = document.querySelector('.profile__username');
	const userStatus = document.querySelector('.profile__status')

	userName.textContent = name.value;
	userStatus.textContent = status.value;
}

// editing profile form handler

formProfile.addEventListener(('submit'), function (event) {
	event.preventDefault();
	editProfile(userNameValue, userStatusValue);
	closePopup(popupProfile);
});

const popupNewCard = document.querySelector('#popup_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close-button');

buttonAddCard.addEventListener(('click'), function () {
	openPopup(popupNewCard);
});

buttonClosePopupNewCard.addEventListener(('click'), function() {
	closePopup(popupNewCard);
});

// adding cards function

function addCard (cardTitle, imageLink) {
	const cardsContainer = document.querySelector('.elements');
	const cardsTemplate = document.querySelector('#element-template').content;
	const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
	const popupCard = document.querySelector('#popup_card');

	cardElement.querySelector('.element__title').textContent = cardTitle;
	cardElement.querySelector('.element__image').src = imageLink;
	cardElement.querySelector('.element__image').alt = cardTitle;

	cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__like-button_active');
	});

	cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
		evt.target.parentElement.remove();
	});

	cardElement.querySelector('.element__image').addEventListener('click', function () {
		popupCard.querySelector('.popup__image').src = imageLink;
		popupCard.querySelector('.popup__image').alt = cardTitle;
		popupCard.querySelector('.popup__image-caption').textContent = cardTitle;
		popupCard.querySelector('.popup__close-button').addEventListener('click', function () {
			closePopup(popupCard);
		});
		openPopup(popupCard);
	});

	cardsContainer.prepend(cardElement);
}

// adding card form form
formAddCard = popupNewCard.querySelector('.form');

formAddCard.addEventListener(('submit'), function (evt) {
	evt.preventDefault();
	const locationName = document.querySelector("div.popup input[name='location-name']");
	const locationImage = document.querySelector("div.popup input[name='location-image']");
	addCard(locationName.value, locationImage.value);
	locationName.value = '';
	locationImage.value = '';
	closePopup(popupNewCard);
	}
);
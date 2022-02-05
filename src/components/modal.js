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

export { openPopup, closePopup };
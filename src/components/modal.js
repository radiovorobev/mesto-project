// open popup function

function openPopup (popupName) {
	popupName.classList.add('popup_opened');
	window.addEventListener('keydown', closeByEsc);
	popupName.addEventListener('click', closeByOverlay);
}

// close popup function

function closePopup (popupName) {
	popupName.classList.remove('popup_opened');
	window.removeEventListener('keydown', closeByEsc);
	popupName.removeEventListener('click', closeByOverlay);
}

//closing popup by Overlay

function closeByOverlay (evt) {
	if (evt.target.classList.contains('popup')) {
		closePopup(evt.target);
	}
}

// closing popup by Esc

function closeByEsc (evt) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_opened')
		closePopup(popup);
	}
}

export { openPopup, closePopup };
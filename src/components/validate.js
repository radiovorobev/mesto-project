const showInputError = (formElement, inputElement, errorMessage, setup) => {
	const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
	inputElement.classList.add(setup.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(setup.errorClass);
};

const hideInputError = (formElement, inputElement, setup) => {
	const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
	inputElement.classList.remove(setup.inputErrorClass);
	errorElement.classList.remove(setup.errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, setup) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, setup);
	} else {
		hideInputError(formElement, inputElement, setup);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

const toggleButtonState = (inputList, buttonElement, setup) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(setup.inactiveButtonClass);
		buttonElement.setAttribute('disabled', 'true');
	} else {
		buttonElement.classList.remove(setup.inactiveButtonClass);
		buttonElement.removeAttribute('disabled');
	}
};

const setEventListeners = (formElement, setup) => {
	const inputList = Array.from(formElement.querySelectorAll(setup.inputSelector));
	const buttonElement = formElement.querySelector(setup.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, setup);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement, setup);
			toggleButtonState(inputList, buttonElement, setup);
		});
	});
};

const enableValidation = (setup) => {
	const formList = Array.from(document.querySelectorAll(setup.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		setEventListeners(formElement, setup);
	});
};

export { enableValidation };
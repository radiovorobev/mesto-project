import {apiConfig} from "./data.js";

function checkStatus(res) {
	if(res.ok) {
		return res.json()
	} else {
		return Promise.reject(`Ошибка: ${res.status}`)
	}
}

export const getProfile = () => {
	return fetch(`${apiConfig.baseUrl}/users/me`, {
		method: 'GET',
		headers: apiConfig.headers
	})
		.then(checkStatus)
}

export const editProfile = (name, status) => {
	return fetch(`${apiConfig.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: apiConfig.headers,
		body: JSON.stringify({
			name: name,
			about: status
		})
	})
		.then(checkStatus)
}

export const editAvatar = (avatar) => {
	return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: apiConfig.headers,
		body: JSON.stringify({
			avatar: avatar
		})
	})
		.then(checkStatus)
}

export const getCards = () => {
	return fetch(`${apiConfig.baseUrl}/cards`, {
		method: 'GET',
		headers: apiConfig.headers
	})
		.then(checkStatus)
}

export const uploadCard = (name, link) => {
	return fetch(`${apiConfig.baseUrl}/cards`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			name: name,
			link: link
		})
	})
		.then(checkStatus)
}

export const deleteCardFromServer = (cardId) => {
	return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: apiConfig.headers
	})
		.then(checkStatus)
}


export const addLikeToServer = (cardId) => {
	return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: apiConfig.headers
	})
		.then(checkStatus)
}

export const removeLikeFromServer= (cardId) => {
	return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: apiConfig.headers
	})
		.then(checkStatus)
}
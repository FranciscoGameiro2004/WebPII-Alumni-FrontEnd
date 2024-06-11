import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const TOKEN_BASE_URL = 'http://127.0.0.1:3000';
const resources = `users/login`;

export const useAuthStore = defineStore('auth', {
	state: () => ({
		userLogged: {},
		authToken: ''
	}),
	getters: {
		getUserLogged: (state) => state.userLogged,
		getToken: (state) => state.authToken
	},
	actions: {
		async postLogin(data) {
			console.log('Fetching token'); //console.table(data)
			const resData = await api.post(TOKEN_BASE_URL, resources, data); console.log(resData)
			this.userLogged = resData.userToLogin; console.log(this.userLogged);
			this.authToken = resData.accessToken; console.log(this.authToken);
		}
	}
})